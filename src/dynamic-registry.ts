import { Codec, CompressorConfig } from './types';

const path = (v: string, id: string): string =>
  `https://www.unpkg.com/numcodecs@${v}/dist/numcodecs/codecs/${id}.js`;

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
  const { default: codec } = await import(path(version, config.id));
  return codec.fromConfig(config);
}

export { getCodec };
