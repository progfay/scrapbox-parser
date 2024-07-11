import { createDefaultPreset } from "ts-jest";

/** @type {import("ts-jest").JestConfigWithTsJest} */
const config = {
  moduleFileExtensions: ["ts", "js"],
  transform: {
    ...createDefaultPreset().transform,
  },
  collectCoverageFrom: ["src/**/*.ts"],
  setupFilesAfterEnv: ["./tests/jest-setup.ts"],
  testMatch: ["**/tests/**/*.test.ts"],
};

export default config;
