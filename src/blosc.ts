import moduleFactory, { BloscModule } from '../codecs/blosc/blosc_codec';
import wasmBinary from 'base64:../codecs/blosc/blosc_codec.wasm';
import type { Codec, CodecConstructor } from './utils';

enum BloscShuffle {
  NOSHUFFLE = 0,
  SHUFFLE = 1,
  BITSHUFFLE = 2,
  AUTOSHUFFLE = -1,
}

interface BloscConfig {
  blocksize?: number;
  clevel?: number;
  cname?: string;
  shuffle?: BloscShuffle;
}

type BloscCompressionLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type BloscCompressor = 'blosclz' | 'lz4' | 'lz4hc' | 'snappy' | 'zlib' | 'zstd';

const COMPRESSORS = new Set(['blosclz', 'lz4', 'lz4hc', 'snappy', 'zlib', 'zstd']);

let emscriptenModule: Promise<BloscModule>;

const Blosc: CodecConstructor<BloscConfig> = class Blosc implements Codec {
  public static codecId = 'blosc';
  public static COMPRESSORS = [...COMPRESSORS];
  public static NOSHUFFLE = BloscShuffle.NOSHUFFLE;
  public static SHUFFLE = BloscShuffle.SHUFFLE;
  public static BITSHUFFLE = BloscShuffle.BITSHUFFLE;
  public static AUTOSHUFFLE = BloscShuffle.AUTOSHUFFLE;

  public clevel: BloscCompressionLevel;
  public cname: BloscCompressor;
  public shuffle: BloscShuffle;
  public blocksize: number;

  constructor(clevel = 5, cname = 'lz4', shuffle = BloscShuffle.SHUFFLE, blocksize = 0) {
    if (clevel < 0 || clevel > 9) {
      throw new Error(`Invalid compression level: '${clevel}'. It should be between 0 and 9`);
    }
    if (!COMPRESSORS.has(cname)) {
      throw new Error(
        `Invalid compressor '${cname}'. Valid compressors include
        'blosclz', 'lz4', 'lz4hc','snappy', 'zlib', 'zstd'.`
      );
    }
    if (shuffle < -1 || shuffle > 2) {
      throw new Error(
        `Invalid shuffle ${shuffle}. Must be one of 0 (NOSHUFFLE),
        1 (SHUFFLE), 2 (BITSHUFFLE), -1 (AUTOSHUFFLE).`
      );
    }
    this.blocksize = blocksize;
    this.clevel = clevel as BloscCompressionLevel;
    this.cname = cname as BloscCompressor;
    this.shuffle = shuffle;
  }

  static fromConfig({ blocksize, clevel, cname, shuffle }: BloscConfig): Blosc {
    return new Blosc(clevel, cname, shuffle, blocksize);
  }

  async encode(data: Uint8Array): Promise<Uint8Array> {
    if (!emscriptenModule) {
      emscriptenModule = moduleFactory({ wasmBinary });
    }
    const module = await emscriptenModule;
    const view = module.compress(data, this.cname, this.clevel, this.shuffle, this.blocksize);
    const result = new Uint8Array(view); // Copy view and free wasm memory
    module.free_result();
    return result;
  }

  async decode(data: Uint8Array, out?: Uint8Array): Promise<Uint8Array> {
    if (!emscriptenModule) {
      emscriptenModule = moduleFactory({ wasmBinary });
    }
    const module = await emscriptenModule;
    const view = module.decompress(data);
    const result = new Uint8Array(view); // Copy view and free wasm memory
    module.free_result();
    if (out !== undefined) {
      out.set(result);
      return out;
    }
    return result;
  }
};

export default Blosc;
