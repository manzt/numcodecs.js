import LZ4 from '../src/lz4';
import { range, linspace, product, checkAsyncEncodeDecode } from './common';

const codecConfigs = [
  { acceleration: -1 },
  { acceleration: 0 },
  { acceleration: 1 },
  { acceleration: 10 },
  { acceleration: 1000000 },
];

const arrays = [
  range(1000, '<u4'),
  linspace(1000, 1001, 1000, '<f4'),
  linspace(35, 4000, 20, '<u4'),
  range(323332, '<i2'),
];

test('Ensure all equal', async () => {
  const codec = new LZ4();
  for (const [config, arr] of product(codecConfigs, arrays)) {
    // Rather than reloading all the webassembly,
    // just reuse the loaded emscripten module and update the properties
    codec.acceleration = config.acceleration;
    const encAndDec = await checkAsyncEncodeDecode(codec, arr);
    expect(arr).toEqual(encAndDec);
  }
});

test('Invalid compressor options', () => {
  expect(() => new LZ4(1.33)).toThrow();
  expect(() => new LZ4(-2.3)).toThrow();
});

test('Static constructor', async () => {
  const config = { id: 'lz4' };
  const codec = LZ4.fromConfig(config);
  const encAndDec = await checkAsyncEncodeDecode(codec, arrays[0]);
  expect(arrays[0]).toEqual(encAndDec);
});
