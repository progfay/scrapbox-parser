import { resolve } from "node:path";
import { type Options, defineConfig } from "tsdown";

type ModuleFormat = Extract<Options["format"], string>;

const FORMAT_ENTRY_FILE_NAMES_MAP = {
	es: "[name].mjs",
	esm: "[name].mjs",
	module: "[name].mjs",
	cjs: "[name].cjs",
	commonjs: "[name].cjs",
	umd: "scrapbox-parser.umd.js",
	iife: undefined,
} as const satisfies Record<ModuleFormat, string | undefined>;

export default defineConfig([
	{
		format: ["es", "cjs", "umd"],
		entry: resolve(import.meta.dirname, "src/index.ts"),
		dts: true,
		minify: true,
		sourcemap: true,
		platform: "neutral",
		outDir: "out",
		clean: true,
		outputOptions: ({ format, entryFileNames, ...options }) => ({
			...options,
			format,
			name: "ScrapboxParser",
			entryFileNames:
				(format && FORMAT_ENTRY_FILE_NAMES_MAP[format]) ?? entryFileNames,
		}),
	},
]);
