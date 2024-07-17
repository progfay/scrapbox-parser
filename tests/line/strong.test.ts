import { describe, it, expect } from "vitest";
import { parse } from "../../src";

describe("strong", () => {
  it("Simple strong", () => {
    expect(parse("[[Simple strong]]", { hasTitle: false })).toMatchSnapshot();
  });

  it("[[]] is not strong", () => {
    expect(parse("[[]]", { hasTitle: false })).toMatchSnapshot();
  });

  it("Decoration in Strong notation", () => {
    expect(parse("[[[! deco]]]", { hasTitle: false })).toMatchSnapshot();
  });
});
