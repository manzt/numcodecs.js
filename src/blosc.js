import moduleFactory from '../codecs/blosc/blosc_codec.js';

/** @typedef {'blosclz' | 'lz4' | 'lz4hc' | 'snappy' | 'zlib' | 'zstd'} Compressor */
/** @typedef {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9} CompressionLevel */
/** @typedef {0 | 1 | 2 | -1} Shuffle */
/**
 * @typedef BloscConfig
 * @property {number} [blocksize]
 * @property {CompressionLevel} [clevel]
 * @property {Compressor} [cname]
 * @property {Shuffle} [shuffle]
 */


/** @type {Promise<import('../codecs/blosc/blosc_codec').BloscModule>} */
let emscriptenModule;
const init = async () => {
  let wasmBinary;
  let url = new URL("../codecs/blosc/blosc_codec.wasm", import.meta.url);
  try {
    const response = await fetch(url);
    wasmBinary = await response.arrayBuffer();
  } catch (e) {
    const fs = await import("node:fs/promises");
    wasmBinary = (await fs.readFile(url)).buffer;
  }
  return moduleFactory({
    noInitialRun: true,
    wasmBinary,
  })
}

export default class Blosc {
  static codecId = 'blosc';
  static COMPRESSORS = [...COMPRESSORS];
  static NOSHUFFLE = 0;
  static SHUFFLE = 1;
  static BITSHUFFLE = 2;
  static AUTOSHUFFLE = -1;

  /**
   * @param {number} clevel
   * @param {Compressor} cname
   * @param {Shuffle} shuffle
   * @param {number} blocksize
   */
  constructor(clevel = 5, cname = 'lz4', shuffle = BloscShuffle.SHUFFLE, blocksize = 0) {
    /** @type {number} */
    this.blocksize = blocksize;
    /** @type {number} */
    this.clevel = clevel;
    /** @type {Compressor} */
    this.cname = cname;
    /** @type {BloscShuffle} */
    this.shuffle = shuffle;
  }

  /** @param {BloscConfig} config */
  static fromConfig({ blocksize, clevel, cname, shuffle }) {
    return new Blosc(clevel, cname, shuffle, blocksize);
  }

  /**
   * @param {Uint8Array} data
   * @returns {Promise<Uint8Array>}
   */
  async encode(data) {
    if (!emscriptenModule) {
      emscriptenModule = init();
    }
    const module = await emscriptenModule;
    const view = module.compress(data, this.cname, this.clevel, this.shuffle, this.blocksize);
    const result = new Uint8Array(view); // Copy view and free wasm memory
    module.free_result();
    return result;
  }

  /**
   * @param {Uint8Array} data
   * @returns {Promise<Uint8Array>}
   */
  async decode(data) {
    if (!emscriptenModule) {
      emscriptenModule = init();
    }
    const module = await emscriptenModule;
    const view = module.decompress(data);
    const result = new Uint8Array(view); // Copy view and free wasm memory
    module.free_result();
    return result;
  }
};
