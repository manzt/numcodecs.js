import { EmscriptenModule, EmscriptenModuleOpts } from "../types";

export enum BloscShuffle {
  NOSHUFFLE = 0,
  SHUFFLE = 1,
  BITSHUFFLE = 2,
  AUTOSHUFFLE = -1,
}

export type BloscCompressionLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type BloscCompressor =
  | "blosclz"
  | "lz4"
  | "lz4hc"
  | "snappy"
  | "zlib"
  | "zstd";

export interface BloscModule extends EmscriptenModule {
  compress(
    data: BufferSource,
    cname: BloscCompressor,
    clevel: BloscCompressionLevel,
    shuffle: BloscShuffle,
    blocksize: number,
  ): Uint8Array;
  decompress(data: BufferSource): Uint8Array;
  // eslint-disable-next-line @typescript-eslint/camelcase
  free_result(): void;
}

export default function (opts: EmscriptenModuleOpts): BloscModule;
