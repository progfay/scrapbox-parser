import { resolve } from "node:path";
import { defineConfig } from "tsdown";

export default defineConfig([
	{
		entry: resolve(import.meta.dirname, "src/index.ts"),
		dts: true,
		minify: true,
		sourcemap: true,
		platform: "neutral",
		clean: true,
	},
]);
