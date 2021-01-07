import pako from 'pako';
import type { Codec, CodecConstructor } from './utils';

type ValidZlibLevelSetting = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

interface ZlibConfig {
  level?: number;
}

const Zlib: CodecConstructor<ZlibConfig> = class Zlib implements Codec {
  public static codecId = 'zlib';
  public level: ValidZlibLevelSetting;

  constructor(level = 1) {
    if (level < -1 || level > 9) {
      throw new Error('Invalid zlib compression level, it should be between -1 and 9');
    }
    this.level = level as ValidZlibLevelSetting;
  }

  static fromConfig({ level }: ZlibConfig): Zlib {
    return new Zlib(level);
  }

  encode(data: Uint8Array): Uint8Array {
    const gzipped = pako.deflate(data, { level: this.level });
    return gzipped;
  }

  decode(data: Uint8Array, out?: Uint8Array): Uint8Array {
    const uncompressed = pako.inflate(data);
    if (out !== undefined) {
      out.set(uncompressed);
      return out;
    }
    return uncompressed;
  }
};

export default Zlib;
