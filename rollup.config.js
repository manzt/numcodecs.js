import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const pkg = require('./package.json');

const codecs = ['zlib', 'gzip'];

export default {
  input: ['src/index.ts', ...codecs.map(c => `src/${c}.ts`)],
  output: [
    // { file: pkg.browser, format: 'umd', name: 'numcodecs' },
    { dir: pkg.module, format: 'es' },
  ],
  external: [],
  watch: { include: 'src/**' },
  plugins: [typescript(), commonjs(), resolve()],
};
