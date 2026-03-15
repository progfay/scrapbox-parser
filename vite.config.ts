import { resolve } from "node:path";
import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    entry: resolve(import.meta.dirname, "src/index.ts"),
    dts: true,
    minify: true,
    sourcemap: true,
    platform: "neutral",
    clean: true,
  },
  lint: {
    ignorePatterns: ["dist/**", "coverage/**"],
    plugins: ["import", "typescript"],
    rules: {
      "import/extensions": "error",
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
  fmt: {},
});
