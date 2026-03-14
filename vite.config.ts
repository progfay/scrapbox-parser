import { resolve } from "node:path";
import { defineConfig } from "vite-plus";

export default defineConfig({
	// tsdown (vp pack) configuration
	pack: {
		entry: resolve(import.meta.dirname, "src/index.ts"),
		dts: true,
		minify: true,
		sourcemap: true,
		platform: "neutral",
		clean: true,
	},

	// Oxlint configuration
	lint: {
		ignorePatterns: ["dist/**", "coverage/**"],
		plugins: ["import", "typescript"],
		rules: {
			// correctness
			"import/extensions": "error",
			// style
			"no-param-reassign": "error",
			"default-param-last": "error",
			"one-var": ["error", "never"],
			"no-useless-template-literals": "error",
			"no-else-return": "error",
			"@typescript-eslint/prefer-as-const": "error",
			"@typescript-eslint/prefer-enum-initializers": "error",
			"@typescript-eslint/no-inferrable-types": "error",
		},
	},

	// Oxfmt configuration (defaults match Biome formatter defaults)
	fmt: {},
});
