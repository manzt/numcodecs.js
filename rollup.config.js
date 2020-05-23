import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const codecs = ['zlib', 'gzip', 'blosc'];
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
        sourcemap: true,
      },
      {
        dir: './dist',
        format: 'es',
        entryFileNames: '[name].mjs',
        chunkFileNames: '[name]-[hash].mjs',
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({ declaration: true, declarationDir: './dist/types/' }),
      commonjs({ exclude: './codecs/**/*' }),
      resolve(),
    ],
  },
];
