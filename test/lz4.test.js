import { test } from 'zora';

import { LZ4 } from '../src/index.js';
import { range, linspace, product, checkAsyncEncodeDecode } from './common.js';

const codecConfigs = [
  { acceleration: -1 },
  { acceleration: 0 },
  { acceleration: 1 },
  { acceleration: 10 },
  { acceleration: 1000000 },
];

const arrays = [
  range(1000, 'uint32'),
  linspace(1000, 1001, 1000, 'float32'),
  linspace(35, 4000, 20, 'uint32'),
  range(323332, 'int16'),
];

test('Ensure all equal', async t => {
  for (const [config, arr] of product(codecConfigs, arrays)) {
    const codec = LZ4.fromConfig(config);
    const encAndDec = await checkAsyncEncodeDecode(codec, arr);
    t.equal(arr, encAndDec);
  }
});
