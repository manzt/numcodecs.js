# numcodecs.js
[![Actions Status](https://github.com/manzt/numcodecs.js/workflows/tests/badge.svg)](https://github.com/manzt/numcodecs.js/actions)
![Top Language Badge](https://img.shields.io/github/languages/top/manzt/numcodecs.js)
[![NPM badge](https://img.shields.io/npm/v/numcodecs)](https://www.npmjs.com/package/numcodecs)

Buffer compression and transformation codecs for use in [Zarr.js](https://github.com/gzuidhof/zarr.js/) and beyond...

### Installation

```bash
npm install numcodecs
```

### Usage

```javascript
import { Blosc } from 'numcodecs';

const codec = new Blosc(); // or Blosc.fromConfig({ clevel: 5, cname: 'lz4', shuffle: Blosc.SHUFFLE, blocksize: 0 });

const size = 100000;
const arr = new Uint32Array(size);
for (let i = 0; i < size; i++) {
  arr[i] = i;
}

const bytes = new Uint8Array(arr.buffer);
console.log(bytes);
// Uint8Array(400000) [0, 0, 0, 0,  1, 0, 0, 0,  2, 0, 0, 0, ... ]

const encoded = await codec.encode(bytes);
console.log(encoded);
// Uint8Array(3744) [2, 1, 33, 4, 128, 26, 6, 0, 0, 0, 4, 0, ... ]

const decoded = await codec.decode(encoded);
console.log(new Uint32Array(decoded.buffer));
// Uint32Array(100000) [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,  ... ]
```

### Author's note

This project is intended as a Typescript implementation of the buffer compression library [`numcodecs`](https://github.com/zarr-developers/numcodecs) which supports [`zarr-python`](https://github.com/zarr-developers/zarr-python). Currently only `blosc`, `zlib`, and `gzip` compressors are supported. No other compressors are implemented, but contributions are welcome!


### Conditional exports

Each compressor is bundled as a separate entrypoint and exported as a package submodule using Node's [conditional exports](https://nodejs.org/api/modules.html). This means each compressor can be imported independently from code-split modules. I hope this will afford an option to have a more dynamic and configurable compressor registry in Zarr.js in the future, allowing users to define the codecs necessary for their applications.

```javascript
// index.js
const Zlib = require('numcodecs/zlib');

// index.mjs
import Zlib from 'numcodecs/zlib';
```
