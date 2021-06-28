import { promises as fsp } from 'fs';

/**
 * This is for the "binary" loader (custom code is ~2x faster than "atob")
 * from: https://github.com/evanw/esbuild/blob/150a01844d47127c007c2b1973158d69c560ca21/internal/runtime/runtime.go#L185
 * 
 * @param {string} base64String 
 * @returns {string}
 */
const code = (base64String) => `
var __isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
var __toBinary = __isNode
  ? base64 => new Uint8Array(Buffer.from(base64, 'base64'))
  : /* @__PURE__ */ (() => {
    var table = new Uint8Array(128)
    for (var i = 0; i < 64; i++) table[i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i * 4 - 205] = i
    return base64 => {
      var n = base64.length, bytes = new Uint8Array((n - (base64[n - 1] == '=') - (base64[n - 2] == '=')) * 3 / 4 | 0)
      for (var i = 0, j = 0; i < n;) {
        var c0 = table[base64.charCodeAt(i++)], c1 = table[base64.charCodeAt(i++)]
        var c2 = table[base64.charCodeAt(i++)], c3 = table[base64.charCodeAt(i++)]
        bytes[j++] = (c0 << 2) | (c1 >> 4)
        bytes[j++] = (c1 << 4) | (c2 >> 2)
        bytes[j++] = (c2 << 6) | c3
      }
      return bytes
    }
  })()
export default __toBinary("${base64String}");
`;

/**
 * @returns {import('rollup').Plugin}
 */
export default function({ importPrefix = 'base64:' } = {}) {
  return {
    name: 'base64',
    async resolveId(id, importer) {
      if (!id.startsWith(importPrefix)) return;
      const plainId = id.slice(importPrefix.length);
      const result = await this.resolve(plainId, importer);
      return importPrefix + result.id;
    },
    async load(id) {
      if (!id.startsWith(importPrefix)) return;
      const fileData = await fsp.readFile(id.slice(importPrefix.length));
      return code(fileData.toString('base64'));
    }
  }
}
