import { describe, it, expect } from "vitest";
import { parse } from "../../src";

describe("code", () => {
  it("Simple code with backquote", () => {
    expect(parse("`Simple code`", { hasTitle: false })).toMatchSnapshot();
  });

  it("Empty code with backquote", () => {
    expect(parse("``", { hasTitle: false })).toMatchSnapshot();
  });
});
