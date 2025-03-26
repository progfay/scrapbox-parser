import { resolve } from "node:path";
import { type LibraryFormats, defineConfig } from "vite";

const formats = ["es", "cjs", "umd"] satisfies LibraryFormats[];

export default defineConfig({
	build: {
		emptyOutDir: false,
		outDir: "out",
		lib: {
			formats,
			entry: resolve(__dirname, "src/index.ts"),
			name: "ScrapboxParser",
			fileName: (format) => {
				switch (format) {
					case "cjs":
						return "index.cjs";
					case "es":
						return "index.mjs";
					case "umd":
						return "scrapbox-parser.umd.js";
					default:
						throw new Error(`unknown format: ${format}`);
				}
			},
		},
	},
});
