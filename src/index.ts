import { CompressorConfig, Codec } from './types';
import { default as GZip } from './codecs/gzip';
import { default as Zlib } from './codecs/zlib';

const registry = new Map();
registry.set('gzip', GZip);
registry.set('zlib', Zlib);

async function getCodec<T extends Codec>(config: CompressorConfig): Promise<T> {
  if (!registry.has(config.id)) {
    throw new Error(
      `Compression codec '${config.id}' is not supported by Zarr.js.`,
    );
  }
  const codec = registry.get(config.id);
  return codec.fromConfig(config);
}

export { getCodec };
