import Blosc, { Shuffle, BloscConfig } from '../src/blosc';
// eslint-disable-next-line @typescript-eslint/camelcase
import blosc_codec from '../codecs/blosc/blosc_codec';
import { initEmscriptenModule } from '../src/utils';

import { range, linspace, product, checkEncodeDecode } from './common';

const codecConfigs: BloscConfig[] = [
  { shuffle: Shuffle.SHUFFLE },
  { clevel: 0, shuffle: Shuffle.SHUFFLE },
  { cname: 'lz4', shuffle: Shuffle.SHUFFLE },
  { cname: 'lz4', clevel: 1, shuffle: Shuffle.NOSHUFFLE },
  { cname: 'lz4', clevel: 5, shuffle: Shuffle.SHUFFLE },
  { cname: 'lz4', clevel: 9, shuffle: Shuffle.BITSHUFFLE },
  { cname: 'zlib', clevel: 1, shuffle: 0 },
  { cname: 'zstd', clevel: 1, shuffle: 1 },
  { cname: 'blosclz', clevel: 1, shuffle: 2 },
  { cname: 'snappy', clevel: 1, shuffle: 2 },
  { shuffle: Shuffle.SHUFFLE, blocksize: 0 },
  { shuffle: Shuffle.SHUFFLE, blocksize: 2 ** 8 },
  { cname: 'lz4', clevel: 1, shuffle: Shuffle.NOSHUFFLE, blocksize: 2 ** 8 },
];

const arrays = [
  range(1000, '<u4'),
  linspace(1000, 1001, 1000, '<f4'),
  linspace(35, 4000, 20, '<u4'),
];

test('ensure all equal', async () => {
  const wasmInstance = await initEmscriptenModule(blosc_codec);
  for (const [{ clevel, cname, blocksize, shuffle }, arr] of product(
    codecConfigs,
    arrays,
  )) {
    const codec = new Blosc(clevel, cname, shuffle, blocksize, wasmInstance);
    const encAndDec = checkEncodeDecode(codec, arr);
    expect(arr).toEqual(encAndDec);
  }
});
