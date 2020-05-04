# numcodecs


Examples:

```javascript
// import entire registry
import { getCodec } from 'numcodecs';
const codec = getCodec({id: 'gzip', level: 1});

// use a dynamic registry, utilizing dynamic imports
import { getCodec } from 'numcodecs/dynamic-registry';
const codec = await getCodec({id: 'gzip', level: 1});

// import individual codecs
import GZip from 'numcodecs/codec/gzip.js';
const codec = new GZip(1);

// Usage
const arr = new Float32Array([1, 2, 3, 4, 5, 6]);
const encoded = codec.encode(new Uint8Array(arr.buffer));
const decoded = coded.decode(encoded);
console.log(new Float32Array(decoded.buffer));
// Float32Array(6) [ 1, 2, 3, 4, 5, 6 ]
```
