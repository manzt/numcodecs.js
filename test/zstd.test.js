import { test } from 'zora';

import { Zstd } from '../src/index.js';
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
  range(1000, 'uint32'),
  linspace(1000, 1001, 1000, 'float32'),
  linspace(35, 4000, 20, 'uint32'),
  range(323332, 'int16'),
];

test('Ensure all equal', async t => {
  for (const [config, arr] of product(codecConfigs, arrays)) {
    const codec = Zstd.fromConfig(config);
    const encAndDec = await checkAsyncEncodeDecode(codec, arr);
    t.equal(arr, encAndDec);
  }
});

test('Static constructor', async t => {
  const codec = Zstd.fromConfig({ id: "zstd" });
  const encAndDec = await checkAsyncEncodeDecode(codec, arrays[0]);
  t.equal(arrays[0], encAndDec);
});
