import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const codecs = ['zlib', 'gzip'];

export default [
  {
    input: 'src/index.ts',
    output: [{ file: './dist/numcodecs/index.js', format: 'es' }],
    watch: { include: 'src/**' },
    plugins: [typescript(), commonjs(), resolve()],
  },
  {
    input: 'src/dynamic-registry.ts',
    output: [{ file: './dist/numcodecs/dynamic-registry.js', format: 'es' }],
    watch: { include: 'src/**' },
    plugins: [typescript(), resolve()],
  },
  {
    input: codecs.map(c => `src/codecs/${c}.ts`),
    output: [{ dir: './dist/numcodecs/codecs/', format: 'es' }],
    watch: { include: 'src/**' },
    plugins: [typescript(), commonjs(), resolve()],
  },
];
