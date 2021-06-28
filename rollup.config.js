import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import base64 from './lib/plugin-base64';

const codecs = ['zlib', 'gzip', 'blosc', 'lz4', 'zstd'];

export default {
  input: ['index', ...codecs].map(d => `./src/${d}.ts`),
  output: { dir: './dist', format: 'esm' },
  plugins: [
    base64(),
    typescript(),
    resolve(),
  ],
};
