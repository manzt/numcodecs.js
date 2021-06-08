import { test } from 'zora';

import { Blosc } from '../dist/index.js';
import { range, linspace, product, checkAsyncEncodeDecode } from './common.js';

const codecConfigs = [
  {},
  { shuffle: Blosc.SHUFFLE },
  { clevel: 0, shuffle: Blosc.SHUFFLE },
  { cname: 'lz4', shuffle: Blosc.SHUFFLE },
  { cname: 'lz4', clevel: 1, shuffle: Blosc.NOSHUFFLE },
  { cname: 'lz4', clevel: 5, shuffle: Blosc.SHUFFLE },
  { cname: 'lz4', clevel: 9, shuffle: Blosc.BITSHUFFLE },
  { cname: 'zlib', clevel: 1, shuffle: 0 },
  { cname: 'zstd', clevel: 1, shuffle: 1 },
  { cname: 'blosclz', clevel: 1, shuffle: 2 },
  { cname: 'snappy', clevel: 1, shuffle: 2 },
  { shuffle: Blosc.SHUFFLE, blocksize: 0 },
  { shuffle: Blosc.SHUFFLE, blocksize: 2 ** 8 },
  { cname: 'lz4', clevel: 1, shuffle: Blosc.NOSHUFFLE, blocksize: 2 ** 8 },
];

const arrays = [
  range(1000, '<u4'),
  linspace(1000, 1001, 1000, '<f4'),
  linspace(35, 4000, 20, '<u4'),
  range(323332, '<i2'),
];

test('Ensure all equal', async t => {
  const codec = new Blosc();
  for (const [config, arr] of product(codecConfigs, arrays)) {
    const codec = Blosc.fromConfig(config);
    const encAndDec = await checkAsyncEncodeDecode(codec, arr);
    t.equal(arr, encAndDec);
  }
});

test('Invalid compressor options', t => {
  t.throws(() => new Blosc(2, 'nope'));
  t.throws(() => new Blosc(-1));
  t.throws(() => new Blosc(10));
  t.throws(() => new Blosc(5, 'lz4', 3));
});

test('Static constructor', async t => {
  const config = {
    id: 'blosc',
    cname: 'lz4',
    shuffle: Blosc.SHUFFLE,
    clevel: 5,
    blocksize: 10,
  };
  const codec = Blosc.fromConfig(config);
  const encAndDec = await checkAsyncEncodeDecode(codec, arrays[0]);
  t.equal(arrays[0], encAndDec);
});
