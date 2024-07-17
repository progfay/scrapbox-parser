/// <reference types="vitest" />
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    emptyOutDir: false,
    outDir: "umd",
    lib: {
      formats: ["umd"],
      entry: resolve(__dirname, "src/index.ts"),
      name: "ScrapboxParser",
      fileName: "scrapbox-parser",
    },
  },
  test: {
    include: ["**/tests/**/*.test.ts"],
    coverage: {
      include: ["src/**/*.ts"],
    },
  },
});
