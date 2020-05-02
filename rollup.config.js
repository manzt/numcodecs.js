import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const pkg = require('./package.json');

export default {
  input: ['src/index.ts', 'src/zlib.ts', 'src/gzip.ts'],
  output: [
    // { file: pkg.browser, format: 'umd', name: 'numcodecs' },
    { dir: pkg.module, format: 'es' },
  ],
  external: [],
  watch: { include: 'src/**' },
  plugins: [typescript(), commonjs(), resolve()],
};
