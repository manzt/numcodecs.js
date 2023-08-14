import moduleFactory, { LZ4Module } from '../codecs/lz4/lz4_codec';
import wasmBinary from '../codecs/lz4/lz4_codec.wasm';
import type { Codec, CodecConstructor } from './types';

const DEFAULT_ACCELERATION = 1;
const MAX_BUFFER_SIZE = 0x7e000000;

let emscriptenModule: Promise<LZ4Module>;
const init = () => moduleFactory({ noInitialRun: true, wasmBinary });

interface LZ4Config {
  acceleration?: number;
}

const LZ4: CodecConstructor<LZ4Config> = class LZ4 implements Codec {
  public static codecId = 'lz4';
  public static DEFAULT_ACCELERATION = DEFAULT_ACCELERATION;
  public static max_buffer_size = MAX_BUFFER_SIZE;
  public max_buffer_size = MAX_BUFFER_SIZE;
  public acceleration: number;

  constructor(acceleration = DEFAULT_ACCELERATION) {
    if (!Number.isInteger(acceleration)) {
      throw Error(`Invalid acceleration "${acceleration}". Must be a positive integer.`);
    }
    this.acceleration = acceleration <= 0 ? DEFAULT_ACCELERATION : acceleration;
  }

  static fromConfig({ acceleration }: LZ4Config): LZ4 {
    return new LZ4(acceleration);
  }

  async encode(data: Uint8Array): Promise<Uint8Array> {
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

  async decode(data: Uint8Array, out?: Uint8Array): Promise<Uint8Array> {
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
    if (out !== undefined) {
      out.set(result);
      return out;
    }
    return result;
  }
};

export default LZ4;
