export interface CodecConstructor<T> {
  fromConfig(config: T & { id: string }): Codec;
  codecId: string;
}

export interface Codec {
  encode(data: Uint8Array): Uint8Array | Promise<Uint8Array>;
  decode(data: Uint8Array, out?: Uint8Array): Uint8Array | Promise<Uint8Array>;
}

export function initEmscriptenModule<M extends EmscriptenWasm.Module>(
  moduleFactory: EmscriptenWasm.ModuleFactory<M>,
  wasmBinary: Uint8Array,
): Promise<M> {
  return moduleFactory({ noInitialRun: true, wasmBinary });
}
