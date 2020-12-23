const DTYPES = new Map(
  Object.entries({
    u1: Uint8Array,
    i1: Int8Array,
    u2: Uint16Array,
    i2: Int16Array,
    u4: Uint32Array,
    i4: Int32Array,
    f4: Float32Array,
    f8: Float64Array,
  })
);

export function range(len, dtype = '<f4') {
  const t = DTYPES.get(dtype.slice(1));
  if (!t) {
    throw new Error(`Dtype not supported, got, ${dtype}`);
  }
  return new t([...Array(len).keys()]);
}

export function linspace(start, stop, num, dtype = '<f4') {
  const arr = [];
  const step = (stop - start) / (num - 1);
  for (let i = 0; i < num; i++) {
    arr.push(start + step * i);
  }
  const t = DTYPES.get(dtype.slice(1));
  if (!t) {
    throw new Error(`Dtype not supported, got, ${dtype}`);
  }
  return new t(arr);
}

export function checkEncodeDecode(codec, arr) {
  const enc = codec.encode(new Uint8Array(arr.buffer));
  const dec = codec.decode(enc);
  return new arr.constructor(dec.buffer);
}

export async function checkAsyncEncodeDecode(codec, arr) {
  const enc = await codec.encode(new Uint8Array(arr.buffer));
  const dec = await codec.decode(enc);
  return new arr.constructor(dec.buffer);
}

export function* product(...iterables) {
  if (iterables.length === 0) {
    return;
  }
  // make a list of iterators from the iterables
  const iterators = iterables.map(it => it[Symbol.iterator]());
  const results = iterators.map(it => it.next());
  if (results.some(r => r.done)) {
    throw new Error('Input contains an empty iterator.');
  }

  for (let i = 0; ; ) {
    if (results[i].done) {
      // reset the current iterator
      iterators[i] = iterables[i][Symbol.iterator]();
      results[i] = iterators[i].next();
      // advance, and exit if we've reached the end
      if (++i >= iterators.length) {
        return;
      }
    } else {
      yield results.map(({ value }) => value);
      i = 0;
    }
    results[i] = iterators[i].next();
  }
}
