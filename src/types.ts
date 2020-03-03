export abstract class Codec {
  static codecId: string;
  abstract encode(data: Uint8Array): ArrayBuffer;
  abstract decode(data: Uint8Array, out?: Uint8Array): ArrayBuffer;
}

export interface CompressorConfig {
  id: string;
}

export type TypedArray =
  | Uint8Array
  | Int8Array
  | Uint16Array
  | Int16Array
  | Uint32Array
  | Int32Array
  | Float32Array
  | Float64Array;
