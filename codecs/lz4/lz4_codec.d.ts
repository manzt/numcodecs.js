import { EmscriptenModule, EmscriptenModuleOpts } from '../types';

export interface LZ4Module extends EmscriptenModule {
  compress(data: BufferSource, acceleration: number): Uint8Array;
  decompress(data: BufferSource): Uint8Array;
  free_result(): void;
}

export default function (opts: EmscriptenModuleOpts): Promise<LZ4Module>;
