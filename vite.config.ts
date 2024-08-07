/// <reference types="vitest" />
import { resolve } from "node:path";
import { defineConfig, type LibraryFormats } from "vite";

const formats = ["es", "cjs", "umd"] satisfies LibraryFormats[];

export default defineConfig({
  build: {
    emptyOutDir: false,
    outDir: "out",
    lib: {
      formats,
      entry: resolve(__dirname, "src/index.ts"),
      fileName: (format) =>
        ((
          {
            cjs: "index.cjs",
            es: "index.mjs",
            umd: "scrapbox-parser.umd.js",
          } satisfies Record<(typeof formats)[number], string>
        )[format]),
    },
  },
  test: {
    include: ["**/tests/**/*.test.ts"],
    coverage: {
      include: ["src/**/*.ts"],
    },
  },
});
