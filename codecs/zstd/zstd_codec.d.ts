export interface ZstdModule extends EmscriptenWasm.Module {
  compress(data: BufferSource, level: number): Uint8Array;
  decompress(data: BufferSource): Uint8Array;
  free_result(): void;
}

declare const moduleFactory: EmscriptenWasm.ModuleFactory<ZstdModule>;

export default moduleFactory;
