import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

const codecs = ['zlib', 'gzip'];
const inputs = Object.fromEntries(codecs.map((c) => [c, `./src/${c}.ts`]));

export default [
  {
    input: { index: './src/index.ts', ...inputs },
    output: [
      { dir: './dist', format: 'cjs', sourcemap: true },
      {
        dir: './dist',
        format: 'es',
        entryFileNames: '[name].mjs',
        chunkFileNames: '[name]-[hash].mjs',
      },
      {
        dir: './dist',
        format: 'es',
        entryFileNames: '[name].module.js',
        chunkFileNames: '[name]-[hash].module.js',
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({ declaration: true, declarationDir: './dist/types/' }),
      commonjs(),
      resolve(),
      terser(),
    ],
  },
  ...Object.entries(inputs).map(([codec, input]) => ({
    input,
    output: [
      {
        dir: './dist',
        format: 'umd',
        name: codec,
        entryFileNames: '[name].umd.js',
        esModule: false,
      },
    ],
    plugins: [typescript(), commonjs(), resolve(), terser()],
  })),
];
