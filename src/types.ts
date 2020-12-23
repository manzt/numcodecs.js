export abstract class Codec {
  static codecId: string;
  abstract encode(data: Uint8Array): Uint8Array | Promise<Uint8Array>;
  abstract decode(data: Uint8Array, out?: Uint8Array): Uint8Array | Promise<Uint8Array>;
}

export interface CompressorConfig {
  id: string;
}
