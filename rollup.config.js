import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { base64 } from 'rollup-plugin-base64';

const codecs = ['zlib', 'gzip', 'blosc', 'lz4', 'zstd'];

export default {
  input: ['index', ...codecs].map(d => `./src/${d}.ts`),
  output: [
    {
      dir: './dist',
      format: 'cjs',
      entryFileNames: '[name].cjs',
      chunkFileNames: '[name]-[hash].cjs',
      exports: 'auto',
    },
    {
      dir: './dist',
      format: 'esm',
      entryFileNames: '[name].mjs',
      chunkFileNames: '[name]-[hash].mjs',
    },
  ],
  plugins: [
    base64({ include: "**/*.wasm" }),
    typescript(),
    resolve(),
  ],
};
