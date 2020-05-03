import { CompressorConfig, Codec } from './types';

const registry = new Set();
registry.add('gzip');
registry.add('zlib');

async function getCodec<T extends Codec>(config: CompressorConfig): Promise<T> {
  if (!registry.has(config.id)) {
    throw new Error(
      `Compression codec '${config.id}' is not supported by Zarr.js.`,
    );
  }
  const { default: codec } = await import(`./${config.id}.js`);
  return codec.fromConfig(config);
}

export { getCodec };
