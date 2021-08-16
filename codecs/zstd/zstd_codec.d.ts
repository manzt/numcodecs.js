export interface ZstdModule extends EmscriptenModule {
  compress(data: BufferSource, level: number): Uint8Array;
  decompress(data: BufferSource): Uint8Array;
  free_result(): void;
}

declare const moduleFactory: EmscriptenModuleFactory<ZstdModule>;

export default moduleFactory;
