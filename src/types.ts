export abstract class Codec {
  abstract codecId: string;
  abstract encode(data: Uint8Array): Uint8Array;
  abstract decode(data: Uint8Array, out?: Uint8Array): Uint8Array;
}
export interface CompressorConfig {
  id: string;
}
