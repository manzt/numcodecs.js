import GZip from '../src/gzip';

import { range, linspace, product, checkEncodeDecode } from './common';

const codecs = [new GZip(), new GZip(2), new GZip(0), new GZip(5), new GZip(9)];

const arrays = [
  range(1000, '<u4'),
  linspace(1000, 1001, 1000, '<f4'),
  linspace(35, 4000, 20, '<u4'),
  range(323332, '<i2'),
];

test('Ensure all equal', () => {
  for (const [codec, arr] of product(codecs, arrays)) {
    const encAndDec = checkEncodeDecode(codec, arr);
    expect(arr).toEqual(encAndDec);
  }
});

test('Throws with invalid compression level', () => {
  expect(() => new GZip(-2)).toThrow();
  expect(() => new GZip(10)).toThrow();
});
