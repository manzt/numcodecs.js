import { EmscriptenModule, EmscriptenModuleOpts } from '../codecs/types';

// Adapted from https://github.com/GoogleChromeLabs/squoosh/blob/master/src/codecs/util.ts
export type ModuleFactory<M extends EmscriptenModule> = (
  opts: EmscriptenModuleOpts,
) => M;

export function initEmscriptenModule<M extends EmscriptenModule>(
  moduleFactory: ModuleFactory<M>,
): Promise<M> {
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
    });
  });
}
