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
    options: { typeAware: true },
    rules: {
      "import/extensions": "error",
      "@typescript-eslint/no-inferrable-types": "error",
      "@typescript-eslint/no-floating-promises": [
        "error",
        {
          allowForKnownSafeCalls: [
            { from: "file", name: ["describe", "it"], path: "./**/*.test.ts" },
          ],
        },
      ],
    },
  },
  fmt: {},
});
