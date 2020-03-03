import { Zlib } from '../src/zlib';

const codecs = [
  new Zlib(),
  new Zlib(-1),
  new Zlib(0),
  new Zlib(1),
  new Zlib(5),
  new Zlib(9),
];

// mix of dtypes: integer, float, bool, string
// mix of shapes: 1D, 2D, 3D
// mix of orders: C, F
const arrays = [];
