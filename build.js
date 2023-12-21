import * as fs from "node:fs/promises";
import * as esbuild from "esbuild";

await esbuild.build({
	entryPoints: [
		"src/gzip.ts",
		"src/zlib.ts",
		"src/blosc.ts",
		"src/lz4.ts",
		"src/zstd.ts",
	],
	outdir: "dist",
	loader: { ".wasm": "binary" },
	bundle: true,
	splitting: true,
	format: "esm",
  packages: "external"
});

fs.writeFile(
	"dist/index.js",
	`\
export { default as GZip } from './gzip.js';
export { default as Zlib } from './zlib.js';
export { default as Blosc } from './blosc.js';
export { default as LZ4 } from './lz4.js';
export { default as Zstd } from './zstd.js';
`,
);
