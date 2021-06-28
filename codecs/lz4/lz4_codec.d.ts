export interface LZ4Module extends EmscriptenWasm.Module {
  compress(data: BufferSource, acceleration: number): Uint8Array;
  decompress(data: BufferSource): Uint8Array;
  free_result(): void;
}

declare const moduleFactory: EmscriptenWasm.ModuleFactory<LZ4Module>;

export default moduleFactory;
