import { test } from 'zora';

import { Zstd } from '../dist/index.js';
import { range, linspace, product, checkAsyncEncodeDecode } from './common.js';

const codecConfigs = [
  { level: -1 },
  { level: 0 },
  { level: 1 },
  { level: 10 },
  { level: 15 },
  { level: 20 },
  { level: 1000000 },
];

const arrays = [
  range(1000, '<u4'),
  linspace(1000, 1001, 1000, '<f4'),
  linspace(35, 4000, 20, '<u4'),
  range(323332, '<i2'),
];

test('Ensure all equal', async t => {
  for (const [config, arr] of product(codecConfigs, arrays)) {
    const codec = Zstd.fromConfig(config);
    const encAndDec = await checkAsyncEncodeDecode(codec, arr);
    t.equal(arr, encAndDec);
  }
});

test('Invalid compressor options', t => {
  t.throws(() => new LZ4(1.33));
  t.throws(() => new LZ4(-2.3));
});

test('Static constructor', async t => {
  const config = { id: 'zstd' };
  const codec = Zstd.fromConfig(config);
  const encAndDec = await checkAsyncEncodeDecode(codec, arrays[0]);
  t.equal(arrays[0], encAndDec);
});

test('Streaming decompression', async t => {
  const config = { id: 'zstd' };
  const codec = Zstd.fromConfig(config);

  // We encode bytes directly that were the result of streaming compression
  const bytes = new Uint8Array([40, 181, 47, 253, 0, 88, 97, 0, 0, 72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33]);
  const dec = await codec.decode(bytes);
  const str = Buffer.from(dec).toString();
  t.equal(str, "Hello World!");

  const bytes2 = new Uint8Array([40, 181, 47, 253, 0, 88, 36, 2, 0, 164, 3, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 1, 0, 58, 252, 223, 115, 5, 5, 76, 0, 0, 8, 115, 1, 0, 252, 255, 57, 16, 2, 76, 0, 0, 8, 107, 1, 0, 252, 255, 57, 16, 2, 76, 0, 0, 8, 99, 1, 0, 252, 255, 57, 16, 2, 76, 0, 0, 8, 91, 1, 0, 252, 255, 57, 16, 2, 76, 0, 0, 8, 83, 1, 0, 252, 255, 57, 16, 2, 76, 0, 0, 8, 75, 1, 0, 252, 255, 57, 16, 2, 76, 0, 0, 8, 67, 1, 0, 252, 255, 57, 16, 2, 76, 0, 0, 8, 117, 1, 0, 252, 255, 57, 16, 2, 76, 0, 0, 8, 109, 1, 0, 252, 255, 57, 16, 2, 76, 0, 0, 8, 101, 1, 0, 252, 255, 57, 16, 2, 76, 0, 0, 8, 93, 1, 0, 252, 255, 57, 16, 2, 76, 0, 0, 8, 85, 1, 0, 252, 255, 57, 16, 2, 76, 0, 0, 8, 77, 1, 0, 252, 255, 57, 16, 2, 77, 0, 0, 8, 69, 1, 0, 252, 127, 29, 8, 1]);
  const dec2 = await codec.decode(bytes2);
  const str2 = Buffer.from(dec2).toString();
  t.equal(str2, "ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz".repeat(1024*32));
});
