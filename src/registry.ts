import { CompressorConfig, Codec } from './types';
import { GZip } from './gzip';
import { Zlib } from './zlib';

export function getCodec(config: CompressorConfig & { level: number }): Codec {
  switch (config.id) {
    case GZip.codecId:
      return new GZip(config.level);
    case Zlib.codecId:
      return new Zlib(config.level);
    default:
      throw new Error(
        `Compression codec ${config.id} is not supported by Zarr.js yet.`,
      );
  }
}
