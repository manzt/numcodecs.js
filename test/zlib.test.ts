import Zlib from '../src/codecs/zlib';

import { range, product, checkEncodeDecode } from './common';

const codecs = [
  new Zlib(),
  new Zlib(-1),
  new Zlib(0),
  new Zlib(5),
  new Zlib(9),
];

const arrays = [
  range(1000, '<f4'),
  // linspace(1000, 1001, 1000, '<f4'),
  // linspace(35, 4000, 20, '<f4'),
];

test('ensure all equal', () => {
  for (const [codec, arr] of product(codecs, arrays)) {
    const encAndDec = checkEncodeDecode(codec, arr);
    console.log(arr[500], encAndDec[500]);
    expect(arr).toEqual(encAndDec);
  }
});
