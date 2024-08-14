export interface ZstdModule extends EmscriptenModule {
  compress(data: BufferSource, level: number): Uint8Array;
  decompress(data: BufferSource): Uint8Array;
  free_result(): void;
  getExceptionMessage(err: WebAssembly.Exception): [string, string];
}

declare const moduleFactory: EmscriptenModuleFactory<ZstdModule>;

export default moduleFactory;
