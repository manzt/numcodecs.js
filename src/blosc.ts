import { Codec } from './types';
import { initEmscriptenModule } from './utils';
import blosc_codec, { BloscModule } from '../codecs/blosc/blosc_codec';

const BLOSC_MAX_OVERHEAD = 16;

export enum Shuffle {
  NOSHUFFLE = 0,
  SHUFFLE = 1,
  BITSHUFFLE = 2,
  AUTOSHUFFLE = -1,
}

export type CompressionLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type CompressionName =
  | 'blosclz'
  | 'lz4'
  | 'lz4hc'
  | 'snappy'
  | 'zlib'
  | 'zstd';

const COMPRESSOR_MAP = new Map()
  .set('blosclz', 0)
  .set('lz4', 1)
  .set('lz4hc', 2)
  .set('snappy', 3)
  .set('zlib', 4)
  .set('zstd', 5);

class Blosc implements Codec {
  public static codecId = 'blosc';
  public blocksize: number;
  public clevel: CompressionLevel;
  public cname: CompressionName;
  public shuffle: Shuffle;
  private _wasmInstance: BloscModule;

  constructor({
    clevel = 5,
    cname = 'lz4',
    shuffle = Shuffle.SHUFFLE,
    blocksize = 0,
    wasmInstance,
  }) {
    if (!wasmInstance) {
      throw Error('Must instanitate from async static contructor');
    }
    if (clevel < 0 || clevel > 9) {
      throw new Error(
        `Invalid blosc compression 'clevel', it should be between 0 and 9`,
      );
    }
    if (!COMPRESSOR_MAP.has(cname)) {
      throw new Error(
        `Invalid compression name '${cname}', it should be
        one of 'blosclz', 'lz4', 'lz4hc','snappy', 'zlib', 'zstd'.`,
      );
    }
    this._wasmInstance = wasmInstance;
    this.blocksize = blocksize;
    this.clevel = clevel as CompressionLevel;
    this.cname = cname as CompressionName;
    this.shuffle = shuffle;
  }

  static async fromConfig({
    blocksize,
    clevel,
    cname,
    shuffle,
  }): Promise<Blosc> {
    const wasmInstance = await initEmscriptenModule(blosc_codec);
    return new Blosc({ blocksize, clevel, cname, shuffle, wasmInstance });
  }

  encode(data: Uint8Array): Uint8Array {
    const { _b_compress: compress, _malloc, _free, HEAP8 } = this._wasmInstance;
    const ptr = _malloc(data.byteLength + data.byteLength + BLOSC_MAX_OVERHEAD);
    const destPtr = ptr + data.byteLength;
    HEAP8.set(data, ptr);
    const cBytes = compress(
      ptr,
      destPtr,
      this.clevel,
      this.shuffle,
      this.blocksize,
      data.length,
      COMPRESSOR_MAP.get(this.cname) as number,
    );
    // check compression was successful
    if (cBytes <= 0) {
      throw Error(`Error during blosc compression: ${cBytes}`);
    }
    const resultView = new Uint8Array(HEAP8.buffer, destPtr, cBytes);
    const result = new Uint8Array(resultView);
    _free(ptr);
    return result;
  }

  decode(data: Uint8Array, out?: Uint8Array): Uint8Array {
    const {
      _b_decompress: decompress,
      _get_nbytes: getNbytes,
      _malloc,
      _free,
      HEAP8,
    } = this._wasmInstance;
    // Allocate memory to copy source array
    const sourcePtr = _malloc(data.byteLength);
    HEAP8.set(data, sourcePtr);

    // Determine size of uncompressed array and allocate
    const nBytes = getNbytes(sourcePtr);
    const destPtr = _malloc(nBytes);
    const ret = decompress(sourcePtr, destPtr);
    if (ret <= 0) {
      throw Error(`Error during blosc decompression: ${ret}`);
    }
    const resultView = new Uint8Array(HEAP8.buffer, destPtr, nBytes);
    const result = new Uint8Array(resultView);
    _free(sourcePtr);
    _free(destPtr);
    if (out !== undefined) {
      out.set(result);
      return out;
    }
    return result;
  }
}

export default Blosc;
