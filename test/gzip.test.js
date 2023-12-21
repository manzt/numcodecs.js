import { test } from 'zora';

import { GZip } from '../src/index.js';
import { range, linspace, product, checkAsyncEncodeDecode } from './common.js';

const codecs = [new GZip(), new GZip(2), new GZip(0), new GZip(5), new GZip(9)];

const arrays = [
  range(1000, 'uint32'),
  linspace(1000, 1001, 1000, 'uint32'),
  linspace(35, 4000, 20, 'uint32'),
  range(323332, 'int16'),
];

test('Ensure all equal', async t => {
  for (const [codec, arr] of product(codecs, arrays)) {
    const encAndDec = await checkAsyncEncodeDecode(codec, arr);
    t.equal(arr, encAndDec);
  }
});
