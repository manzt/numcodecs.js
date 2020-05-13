import Blosc, {
  BloscConfig,
  BloscCompressionLevel,
  BloscCompressor,
} from '../src/blosc';

import { range, linspace, product, checkAsyncEncodeDecode } from './common';

const codecConfigs: BloscConfig[] = [
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
];

test('ensure all equal', async () => {
  const codec = new Blosc();
  for (const [{ cname, clevel, shuffle, blocksize }, arr] of product(
    codecConfigs,
    arrays,
  )) {
    // Rather than reloading all the webassembly,
    // just reuse the loaded emscripten module and update the properties
    if (cname) codec.cname = cname as BloscCompressor;
    if (clevel) codec.clevel = clevel as BloscCompressionLevel;
    if (shuffle) codec.shuffle = shuffle;
    if (blocksize) codec.blocksize = blocksize;

    const encAndDec = await checkAsyncEncodeDecode(codec, arr);
    expect(arr).toEqual(encAndDec);
  }
});
