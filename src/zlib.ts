import * as fflate from "fflate";
import type { Codec, CodecConstructor } from './types';

type ValidZlibLevelSetting = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | undefined;

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
    return fflate.zlibSync(data, { level: this.level });
  }

  decode(data: Uint8Array): Uint8Array {
    return fflate.unzlibSync(data);
  }
};

export default Zlib;
