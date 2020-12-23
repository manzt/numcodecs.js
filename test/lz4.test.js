import { test } from 'zora';

import { LZ4 } from '../dist/index.mjs';
import { range, linspace, product, checkAsyncEncodeDecode } from './common.js';

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

test('Ensure all equal', async t => {
  for (const [config, arr] of product(codecConfigs, arrays)) {
    const codec = LZ4.fromConfig(config);
    const encAndDec = await checkAsyncEncodeDecode(codec, arr);
    t.equal(arr, encAndDec);
  }
});

test('Invalid compressor options', t => {
  t.throws(() => new LZ4(1.33));
  t.throws(() => new LZ4(-2.3));
});

test('Static constructor', async t => {
  const config = { id: 'lz4' };
  const codec = LZ4.fromConfig(config);
  const encAndDec = await checkAsyncEncodeDecode(codec, arrays[0]);
  t.equal(arrays[0], encAndDec);
});
