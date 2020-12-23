import { test } from 'zora';

import { Zlib } from '../dist/index.mjs';
import { range, linspace, product, checkEncodeDecode } from './common.js';

const codecs = [new Zlib(), new Zlib(-1), new Zlib(0), new Zlib(5), new Zlib(9)];

const arrays = [
  range(1000, '<u4'),
  linspace(1000, 1001, 1000, '<f4'),
  linspace(35, 4000, 20, '<u4'),
  range(323332, '<i2'),
];

test('Ensure all equal', t => {
  for (const [codec, arr] of product(codecs, arrays)) {
    const encAndDec = checkEncodeDecode(codec, arr);
    t.equal(arr, encAndDec);
  }
});

test('Throws on invalid compression level', t => {
  t.throws(() => new Zlib(10));
  t.throws(() => new Zlib(-2));
});
