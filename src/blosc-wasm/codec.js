import wasmModule from '/blosc_module.js';

// From https://github.com/GoogleChromeLabs/squoosh/blob/master/src/codecs/util.ts
export function initEmscriptenModule(moduleFactory) {
  return new Promise((resolve) => {
    const module = moduleFactory({
      // Just to be safe, don't automatically invoke any wasm functions
      noInitialRun: true,
      onRuntimeInitialized() {
        // An Emscripten is a then-able that resolves with itself, causing an infite loop when you
        // wrap it in a real promise. Delete the `then` prop solves this for now.
        // https://github.com/kripken/emscripten/issues/5820
        delete module.then;
        resolve(module);
      },
    });
  });
}

const BLOSC_MAX_OVERHEAD = 16;

const shuffle = new Map()
  .set('NOSHUFFLE', 0)
  .set('SHUFFLE', 1)
  .set('BITSHUFFLE', 2)
  .set('AUTOSHUFFLE', -1);

const compressors = new Map()
  .set('blosclz', 0)
  .set('lz4', 1)
  .set('lz4hc', 2)
  .set('snappy', 3)
  .set('zlib', 4)
  .set('zstd', 5);

export default class Codec {
  constructor({ blocksize, clevel, cname, shuffle, wasmInstance = null }) {
    if (!wasmInstance) {
      throw Error('Must instanitate from async static contructor');
    }
    this._wasmInstance = wasmInstance;
    this.blocksize = blocksize;
    this.clevel = clevel;
    this.cname = cname;
    this.shuffle = shuffle;
  }

  static async fromConfig({ blocksize, clevel, cname, shuffle }) {
    const wasmInstance = await initEmscriptenModule(wasmModule);
    return new Codec({ blocksize, clevel, cname, shuffle, wasmInstance });
  }

  encode(arr) {
    const { _b_compress: compress, _malloc, _free, HEAP8 } = this._wasmInstance;
    const ptr = _malloc(arr.byteLength + arr.byteLength + BLOSC_MAX_OVERHEAD);
    const destPtr = ptr + arr.byteLength;
    HEAP8.set(arr, ptr);
    const cBytes = compress(
      ptr,
      destPtr,
      this.clevel,
      this.shuffle,
      this.byteLength,
      arr.length,
      compressors.get(this.cname),
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

  decode(arr) {
    const {
      _b_decompress: decompress,
      _get_nbytes: getNbytes,
      _malloc,
      _free,
      HEAP8,
    } = this._wasmInstance;
    // Need to allocate both for source and dest arrays
    const sourcePtr = _malloc(arr.byteLength);
    HEAP8.set(arr, sourcePtr);

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
    return result;
  }
}
