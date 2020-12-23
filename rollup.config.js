import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { base64 } from 'rollup-plugin-base64';

const codecs = ['zlib', 'gzip', 'blosc', 'lz4'];
const inputs = Object.fromEntries(codecs.map((c) => [c, `./src/${c}.ts`]));

export default [
  {
    input: { index: './src/index.ts', ...inputs },
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
        format: 'es',
        entryFileNames: '[name].mjs',
        chunkFileNames: '[name]-[hash].mjs',
      },
    ],
    plugins: [
      base64({ include: "**/*.wasm" }),
      typescript({ declaration: true, declarationDir: './dist/types/' }),
      resolve(),
    ],
  },
];
