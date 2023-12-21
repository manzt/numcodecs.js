import moduleFactory from '../codecs/lz4/lz4_codec.js';

/**
 * @typedef Config
 * @property {number} [acceleration]
 */

const DEFAULT_ACCELERATION = 1;
const MAX_BUFFER_SIZE = 0x7e000000;

/** @type {Promise<import('../codecs/lz4/lz4_codec.js').LZ4Module>} */
let emscriptenModule;
/** @returns {Promise<import('../codecs/lz4/lz4_codec.js').LZ4Module>} */
const init = async () => {
  let wasmBinary;
  let url = new URL("../codecs/lz4/lz4_codec.wasm", import.meta.url);
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

export default class LZ4 {
  static codecId = 'lz4';
  static DEFAULT_ACCELERATION = DEFAULT_ACCELERATION;
  static max_buffer_size = MAX_BUFFER_SIZE;

  /** @param {number} acceleration */
  constructor(acceleration = DEFAULT_ACCELERATION) {
    /** @type {number} */
    this.acceleration = acceleration <= 0 ? DEFAULT_ACCELERATION : acceleration;
  }

  /** @param {Config} config */
  static fromConfig({ acceleration }) {
    return new LZ4(acceleration);
  }

  /** @param {Uint8Array} data */
  async encode(data) {
    if (!emscriptenModule) {
      emscriptenModule = init();
    }

    if (data.length > MAX_BUFFER_SIZE) {
      throw Error(`Codec does not support buffers of > ${MAX_BUFFER_SIZE} bytes.`);
    }

    const module = await emscriptenModule;
    const view = module.compress(data, this.acceleration);
    const result = new Uint8Array(view); // Copy view and free wasm memory
    module.free_result();
    return result;
  }

  /** @param {Uint8Array} data */
  async decode(data) {
    if (!emscriptenModule) {
      emscriptenModule = init();
    }
    if (data.length > MAX_BUFFER_SIZE) {
      throw Error(`Codec does not support buffers of > ${MAX_BUFFER_SIZE} bytes.`);
    }
    const module = await emscriptenModule;
    const view = module.decompress(data);
    const result = new Uint8Array(view); // Copy view and free wasm memory
    module.free_result();
    return result;
  }
};
