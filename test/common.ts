import { Codec } from '../src/types';

export type TypedArray =
  | Uint8Array
  | Int8Array
  | Uint16Array
  | Int16Array
  | Uint32Array
  | Int32Array
  | Float32Array
  | Float64Array;

export type TypedArrayConstructor<TypedArray> = {
  new (): TypedArray;
  new (size: number): TypedArray;
  new (buffer: ArrayBuffer): TypedArray;
  new (arr: number[]): TypedArray;
  BYTES_PER_ELEMENT: number;
};

export type DtypeString =
  | '<u1'
  | '<i1'
  | '<u2'
  | '<i2'
  | '<u4'
  | '<i4'
  | '<f4'
  | '<f8'
  | '<b'
  | '<B';

const DTYPE_MAP = new Map<DtypeString, TypedArrayConstructor<TypedArray>>()
  .set('<b', Int8Array)
  .set('<B', Uint8Array)
  .set('<u1', Uint8Array)
  .set('<i1', Int8Array)
  .set('<u2', Uint16Array)
  .set('<i2', Int16Array)
  .set('<u4', Uint32Array)
  .set('<i4', Int32Array)
  .set('<f4', Float32Array)
  .set('<f8', Float64Array);

export function range(len: number, dtype: DtypeString = '<f4'): TypedArray {
  const t = DTYPE_MAP.get(dtype) as TypedArrayConstructor<TypedArray>;
  return new t([...Array(len).keys()]);
}

export function linspace(
  start: number,
  stop: number,
  num: number,
  dtype: DtypeString = '<f4',
): TypedArray {
  const arr = [];
  const step = (stop - start) / (num - 1);
  for (let i = 0; i < num; i++) {
    arr.push(start + step * i);
  }
  const t = DTYPE_MAP.get(dtype) as TypedArrayConstructor<TypedArray>;
  return new t(arr);
}

export function checkEncodeDecode<T extends Codec>(
  codec: T,
  arr: TypedArray,
): TypedArray {
  const enc = codec.encode(new Uint8Array(arr.buffer)) as Uint8Array;
  const dec = codec.decode(enc) as Uint8Array;
  const t = arr.constructor as TypedArrayConstructor<TypedArray>;
  return new t(dec.buffer);
}

export async function checkAsyncEncodeDecode<T extends Codec>(
  codec: T,
  arr: TypedArray,
): Promise<TypedArray> {
  const enc = await codec.encode(new Uint8Array(arr.buffer));
  const dec = await codec.decode(enc);
  const t = arr.constructor as TypedArrayConstructor<TypedArray>;
  return new t(dec.buffer);
}

export function* product<T extends Array<Iterable<any>>>(
  ...iterables: T
): IterableIterator<
  {
    [K in keyof T]: T[K] extends Iterable<infer U> ? U : never;
  }
> {
  if (iterables.length === 0) {
    return;
  }
  // make a list of iterators from the iterables
  const iterators = iterables.map((it) => it[Symbol.iterator]());
  const results = iterators.map((it) => it.next());
  if (results.some((r) => r.done)) {
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
      yield results.map(({ value }) => value) as any;
      i = 0;
    }
    results[i] = iterators[i].next();
  }
}
