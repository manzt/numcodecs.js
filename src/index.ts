import { CompressorConfig, Codec } from './types';

const registry = new Map()
  .set('gzip', () => import('./gzip'))
  .set('zlib', () => import('./zlib'));

async function getCodec<T extends Codec>(config: CompressorConfig): Promise<T> {
  if (!registry.has(config.id)) {
    throw new Error(
      `Compression codec ${config.id} is not supported by Zarr.js yet.`,
    );
  }
  const codec = await registry.get(config.id);
  return codec.fromConfig(config);
}

export { getCodec };
