import eslint from "@eslint/js";
import tsEslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginVitest from "eslint-plugin-vitest";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default tsEslint.config(
  {
    ignores: ["lib/**", "esm/**", "umd/**"],
    extends: [
      eslint.configs.recommended,
      ...tsEslint.configs.recommended,
      eslintConfigPrettier,
    ],
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        sourceType: "module",
        project: "./tsconfig.eslint.json",
      },
    },
    plugins: {
      "@typescript-eslint": tsEslint.plugin,
    },
  },
  {
    files: ["tests/**"],
    ...eslintPluginVitest.configs.recommended,
  },
);
