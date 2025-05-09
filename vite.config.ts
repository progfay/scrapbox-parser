import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		emptyOutDir: false,
		outDir: "out",
		lib: {
			formats: ["es"],
			entry: resolve(__dirname, "src/index.ts"),
			fileName: "index",
		},
	},
});
