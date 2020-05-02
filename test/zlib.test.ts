import { Zlib } from '../src';
import { CompressorConfig } from '../src/types';

import { range, product, checkEncodeDecode } from './common';

const codecs = [
  new Zlib({} as CompressorConfig),
  new Zlib({ level: -1 } as CompressorConfig),
  new Zlib({ level: 0 } as CompressorConfig),
  new Zlib({ level: 5 } as CompressorConfig),
  new Zlib({ level: 9 } as CompressorConfig),
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
