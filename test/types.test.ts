import { Codec, CompressorConfig } from '../src/types';

describe('Check types and abstract class', () => {
  it('Correctly implements Codec', () => {
    class Mock implements Codec {
      public static codecId = 'mock';
      encode(data: Uint8Array): Uint8Array {
        return data;
      }
      decode(data: Uint8Array): Uint8Array {
        return data;
      }
    }
    const mock = new Mock();
    const data = new Uint8Array(10);
    expect(mock.encode(data)).toEqual(data);
    expect(mock.decode(data)).toEqual(data);
    expect(typeof (mock.constructor as any).codecId).toBe('string');
  });

  it('Compressor Config', () => {
    function isCompressorConfig(object: any): object is CompressorConfig {
      const compressorConfig = object as CompressorConfig;
      return typeof compressorConfig.id === 'string';
    }
    expect(isCompressorConfig({ id: 'mock' })).toBeTruthy();
    expect(isCompressorConfig({ id: 10 })).toBeFalsy();
    expect(isCompressorConfig({ someKey: 'mock' })).toBeFalsy();
  });
});
