import Blosc from '../src/blosc';
import { range, linspace, product, checkAsyncEncodeDecode } from './common';
import {
  BloscCompressor,
  BloscCompressionLevel,
  BloscShuffle,
} from '../codecs/blosc/blosc_codec';

interface Config {
  cname?: BloscCompressor;
  shuffle?: BloscShuffle;
  clevel?: BloscCompressionLevel;
  blocksize?: number;
}

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

test('Ensure all equal', async () => {
  const codec = new Blosc();
  for (const [config, arr] of product(codecConfigs, arrays)) {
    const { cname, clevel, shuffle, blocksize } = config as Config;
    // Rather than reloading all the webassembly,
    // just reuse the loaded emscripten module and update the properties
    if (cname) codec.cname = cname;
    if (clevel) codec.clevel = clevel;
    if (shuffle) codec.shuffle = shuffle;
    if (blocksize) codec.blocksize = blocksize;

    const encAndDec = await checkAsyncEncodeDecode(codec, arr);
    expect(arr).toEqual(encAndDec);
  }
});

test('Invalid compressor options', () => {
  expect(() => new Blosc(2, 'nope')).toThrow();
  expect(() => new Blosc(-1)).toThrow();
  expect(() => new Blosc(10)).toThrow();
  expect(() => new Blosc(5, 'lz4', 3)).toThrow();
});

test('Static constructor', async () => {
  const config = {
    id: 'blosc',
    cname: 'lz4',
    shuffle: Blosc.SHUFFLE,
    clevel: 5,
    blocksize: 10,
  };
  const codec = Blosc.fromConfig(config);
  const encAndDec = await checkAsyncEncodeDecode(codec, arrays[0]);
  expect(arrays[0]).toEqual(encAndDec);
});
