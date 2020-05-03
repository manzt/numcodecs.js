import { Codec, CompressorConfig } from './types';

function getUrl(version: string, codecId: string): string {
  return `https://cdn.pika.dev/numcodecs@${version}/codecs/${codecId}.js`;
}

const registry = new Set();
registry.add('gzip');
registry.add('zlib');

async function getCodec<T extends Codec>(
  config: CompressorConfig,
  version = '^0.0.1',
): Promise<T> {
  if (!registry.has(config.id)) {
    throw new Error(
      `Compression codec '${config.id}' is not supported by Zarr.js.`,
    );
  }
  const { default: codec } = await import(getUrl(version, config.id));
  return codec.fromConfig(config);
}

export { getCodec };
