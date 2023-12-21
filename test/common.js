const DTYPES = /** @type {const} */ ({
    uint8: Uint8Array,
    uint16: Uint16Array,
    uint32: Uint32Array,
    int8: Int8Array,
    int16: Int16Array,
    int32: Int32Array,
    float32: Float32Array,
    float64: Float64Array,
})

/**
  * @param {number} len
  * @param {keyof typeof DTYPES} dtype
  */
export function range(len, dtype = 'float32') {
  return new DTYPES[dtype]([...Array(len).keys()]);
}

/**
  * @param {number} start
  * @param {number} stop
  * @param {number} num
  * @param {keyof typeof DTYPES} dtype
  */
export function linspace(start, stop, num, dtype = 'float32') {
  const arr = [];
  const step = (stop - start) / (num - 1);
  for (let i = 0; i < num; i++) {
    arr.push(start + step * i);
  }
  return new DTYPES[dtype](arr);
}

/**
  * @template {InstanceType<DTYPES[keyof typeof DTYPES]>} Arr
  * @param {import('../src/types.js').Codec} codec
  * @param {Arr} arr
  * @returns {Promise<Arr>}
  */
export async function checkAsyncEncodeDecode(codec, arr) {
  const enc = await codec.encode(new Uint8Array(arr.buffer));
  const dec = await codec.decode(enc);
  // @ts-expect-error - TS doesn't know that the constructor is a typed array
  return new arr.constructor(dec.buffer);
}

/** @param {any[]} iterables */
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
