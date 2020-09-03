import { EmscriptenModule, EmscriptenModuleOpts } from '../types';

export interface LZ4Module extends EmscriptenModule {
  compress(
    data: BufferSource,
    acceleration: number,
  ): Uint8Array;
  decompress(data: BufferSource): Uint8Array;
  // eslint-disable-next-line @typescript-eslint/camelcase
  free_result(): void;
}

export default function (opts: EmscriptenModuleOpts): LZ4Module;
