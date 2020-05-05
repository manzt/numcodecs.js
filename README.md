# numcodecs


Examples:

Some experiments with Node.js 14.1 [module exports](https://nodejs.org/api/modules.html).
```javascript
const { config } = { id: 'gzip', level: 1 };

// Loading
import { registry } from 'numcodecs';
const GZip = await registry.get(config.id)();

// or
import GZip from 'numcodecs/gzip';

// or
const { default: GZip } = await import("https://cdn.pika.dev/numcodecs/^0.0.12/gzip");

const codec = GZip.fromConfig(config); // or new GZip(1)

// Usage
const arr = new Float32Array([1, 2, 3, 4, 5, 6]);
const encoded = codec.encode(new Uint8Array(arr.buffer));
const decoded = coded.decode(encoded);
console.log(new Float32Array(decoded.buffer));
// Float32Array(6) [ 1, 2, 3, 4, 5, 6 ]
```
