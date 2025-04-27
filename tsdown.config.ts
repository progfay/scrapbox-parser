import { resolve } from "node:path";
import { defineConfig } from "tsdown";

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
		globalName: "ScrapboxParser",
		outputOptions: ({ entryFileNames, ...options }, format) => ({
			...options,
			entryFileNames:
				(
					{
						es: "[name].mjs",
						cjs: "[name].cjs",
						umd: "scrapbox-parser.umd.js",
					} satisfies { [K in typeof format]?: string }
				)[format] ?? entryFileNames,
		}),
	},
]);
