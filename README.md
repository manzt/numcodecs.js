# numcodecs


Examples:

Some experiments with Node.js 14.1 [package exports](https://nodejs.org/api/modules.html).
```javascript
// Rollup & webpack don't have great support for exports so the easiest
// way to import from the main (since the lib is completely tree shakeable)
import { GZip } from 'numcodecs';

// Node 14 conditional exports

// index.mjs
import { GZip } from 'numcodecs';
import GZip from 'numcodecs/gzip';

// index.js
const GZip = require('numcodecs').GZip;
const GZip = require('numcodecs/gzip');

const codec = GZip.fromConfig({ level: 1 }); // or new GZip(1);

// Usage
const arr = new Float32Array([1, 2, 3, 4, 5, 6]);
const encoded = codec.encode(new Uint8Array(arr.buffer));
const decoded = coded.decode(encoded);
console.log(new Float32Array(decoded.buffer));
// Float32Array(6) [ 1, 2, 3, 4, 5, 6 ]
```
