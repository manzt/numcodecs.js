import moduleFactory from '../codecs/zstd/zstd_codec.js';

/**
 * @typedef Config
 * @property {number} [level]
 */

const DEFAULT_CLEVEL = 1;
const MAX_CLEVEL = 22;

/** @type {Promise<import('../codecs/zstd/zstd_codec').ZstdModule>} */
let emscriptenModule;
const init = async () => {
  let wasmBinary;
  let url = new URL("../codecs/zstd/zstd_codec.wasm", import.meta.url);
  try {
    // Browser and Deno
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

export default class Zstd {
  static codecId = 'zstd';
  static DEFAULT_CLEVEL = DEFAULT_CLEVEL;
  static MAX_CLEVEL = MAX_CLEVEL;

  /** @param {number} level */
  constructor(level = DEFAULT_CLEVEL) {
    /** @type {number} */
    this.level = level;
  }

  /** @param {Config} config */
  static fromConfig({ level }) {
    return new Zstd(level);
  }

  /**
   * @param {Uint8Array} data
   * @returns {Promise<Uint8Array>}
   */
  async encode(data) {
    if (!emscriptenModule) {
      emscriptenModule = init();
    }
    let level = this.level;
    if (level <= 0) {
      level = DEFAULT_CLEVEL;
    }
    if (level > MAX_CLEVEL) {
      level = MAX_CLEVEL;
    }
    const module = await emscriptenModule;
    const view = module.compress(data, level);
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
    if (out !== undefined) {
      out.set(result);
      return out;
    }
    return result;
  }
};
