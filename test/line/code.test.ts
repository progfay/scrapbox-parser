import { describe, expect, it } from "vite-plus/test";
import { parse } from "../../src/index.ts";

describe("code", () => {
  it("Simple code with backquote", () => {
    expect(parse("`Simple code`", { hasTitle: false })).toMatchSnapshot();
  });

  it("Empty code with backquote", () => {
    expect(parse("``", { hasTitle: false })).toMatchSnapshot();
  });
});
