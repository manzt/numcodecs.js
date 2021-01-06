export interface CodecConstructor<T> {
  fromConfig(config: T & { id: string }): Codec;
  codecId: string;
}

export interface Codec {
  encode(data: Uint8Array): Uint8Array | Promise<Uint8Array>;
  decode(data: Uint8Array, out?: Uint8Array): Uint8Array | Promise<Uint8Array>;
}

const IS_NODE = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

// This is for the "binary" loader (custom code is ~2x faster than "atob")
// from: https://github.com/evanw/esbuild/blob/150a01844d47127c007c2b1973158d69c560ca21/internal/runtime/runtime.go#L185
export let __toBinary = IS_NODE
  ? (base64: string) => new Uint8Array(Buffer.from(base64, 'base64'))
  : /* @__PURE__ */ (() => {
      var table = new Uint8Array(128);
      for (var i = 0; i < 64; i++) table[i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i * 4 - 205] = i;
      return (base64: string) => {
        var n = base64.length;
        // @ts-ignore
        var bytes = new Uint8Array((((n - (base64[n - 1] == '=') - (base64[n - 2] == '=')) * 3) / 4) | 0);
        for (var i = 0, j = 0; i < n; ) {
          var c0 = table[base64.charCodeAt(i++)],
            c1 = table[base64.charCodeAt(i++)];
          var c2 = table[base64.charCodeAt(i++)],
            c3 = table[base64.charCodeAt(i++)];
          bytes[j++] = (c0 << 2) | (c1 >> 4);
          bytes[j++] = (c1 << 4) | (c2 >> 2);
          bytes[j++] = (c2 << 6) | c3;
        }
        return bytes;
      };
    })();

export function initEmscriptenModule<M extends EmscriptenWasm.Module>(
  moduleFactory: EmscriptenWasm.ModuleFactory<M>,
  src: string
): Promise<M> {
  const wasmBinary = __toBinary(src);
  return moduleFactory({ noInitialRun: true, wasmBinary });
}
