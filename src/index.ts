import { CompressorConfig, Codec } from './types';
import { GZip } from './gzip';
import { Zlib } from './zlib';

const registry = new Map().set(GZip.codecId, GZip).set(Zlib.codecId, Zlib);

function getCodec<T extends Codec>(config: CompressorConfig): T {
  if (!registry.has(config.id)) {
    throw new Error(
      `Compression codec ${config.id} is not supported by Zarr.js yet.`,
    );
  }
  const codec = registry.get(config.id);
  return new codec(config);
}

export { getCodec, GZip, Zlib };
