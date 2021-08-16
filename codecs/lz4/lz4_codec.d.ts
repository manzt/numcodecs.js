export interface LZ4Module extends EmscriptenModule {
  compress(data: BufferSource, acceleration: number): Uint8Array;
  decompress(data: BufferSource): Uint8Array;
  free_result(): void;
}

declare const moduleFactory: EmscriptenModuleFactory<LZ4Module>;

export default moduleFactory;
