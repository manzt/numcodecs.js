import { initEmscriptenModule } from './utils';
import zstd_codec, { ZstdModule } from '../codecs/zstd/zstd_codec';
import wasmSrc from 'base64:../codecs/zstd/zstd_codec.wasm';
import type { Codec, CodecConstructor } from './utils';

const DEFAULT_CLEVEL = 1;
const MAX_CLEVEL = 22;

let emscriptenModule: Promise<ZstdModule>;

interface ZstdConfig {
  level?: number;
}

const Zstd: CodecConstructor<ZstdConfig> = class Zstd implements Codec {
  public static codecId = 'zstd';
  public static DEFAULT_CLEVEL = DEFAULT_CLEVEL;
  public static MAX_CLEVEL = MAX_CLEVEL;
  public level: number;

  constructor(level = DEFAULT_CLEVEL) {
    if (!Number.isInteger(level)) {
      throw Error(`Invalid acceleration "${level}". Must be a positive integer.`);
    }
    this.level = level;
  }

  static fromConfig({ level }: ZstdConfig): Zstd {
    return new Zstd(level);
  }

  async encode(data: Uint8Array): Promise<Uint8Array> {
    if (!emscriptenModule) {
      emscriptenModule = initEmscriptenModule(zstd_codec, wasmSrc);
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

  async decode(data: Uint8Array, out?: Uint8Array): Promise<Uint8Array> {
    if (!emscriptenModule) {
      emscriptenModule = initEmscriptenModule(zstd_codec, wasmSrc);
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

export default Zstd;
