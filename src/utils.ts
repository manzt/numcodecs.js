import { EmscriptenModule, EmscriptenModuleOpts } from "../codecs/types";

function base64ToBytes(src: string): Uint8Array {
  const isNode = typeof process !== "undefined" && process.versions != null &&
    process.versions.node != null;
  if (isNode) {
    return Buffer.from(src, "base64");
  }
  const raw = globalThis.atob(src);
  const len = raw.length;
  const buffer = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    buffer[i] = raw.charCodeAt(i);
  }
  return buffer;
}

// Adapted from https://github.com/GoogleChromeLabs/squoosh/blob/master/src/codecs/util.ts
export type ModuleFactory<M extends EmscriptenModule> = (
  opts: EmscriptenModuleOpts,
) => M;

export function initEmscriptenModule<M extends EmscriptenModule>(
  moduleFactory: ModuleFactory<M>,
  src: string,
): Promise<M> {
  const wasmBinary = base64ToBytes(src);
  return new Promise((resolve) => {
    const module = moduleFactory({
      // Just to be safe, don't automatically invoke any wasm functions
      noInitialRun: true,
      onRuntimeInitialized() {
        // An Emscripten is a then-able that resolves with itself, causing an infite loop when you
        // wrap it in a real promise. Delete the `then` prop solves this for now.
        // https://github.com/kripken/emscripten/issues/5820
        delete (module as any).then;
        resolve(module);
      },
      wasmBinary,
    });
  });
}
