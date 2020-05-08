import { EmscriptenModule, EmscriptenModuleOpts } from '../types';

interface BloscModule extends EmscriptenModule {
  /* eslint-disable @typescript-eslint/camelcase */
  _b_compress(
    sourcePtr: number,
    destPtr: number,
    clevel: number,
    shuffle: number,
    blocksize: number,
    nbytes: number,
    cname: number,
  ): number;
  _b_decompress(sourcePtr: number, destPtr: number): number;
  _get_nbytes(sourcePtr: number): number;
  /* eslint-enable @typescript-eslint/camelcase */
}

export default function (opts: EmscriptenModuleOpts): BloscModule;
