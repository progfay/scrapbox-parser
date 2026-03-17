import { describe, expect, it } from "vitest";
import { parse } from "../../src/index.ts";

describe("formula", () => {
  it("Simple formula", () => {
    expect(
      parse("[$ \\frac{3}{2}^N]", {
        hasTitle: false,
      }),
    ).toMatchSnapshot();
  });

  it("Formula includes [] with tail half-space", () => {
    expect(parse("[$ [x] ]", { hasTitle: false })).toMatchSnapshot();
  });

  it("Formula includes [] without tail half-space", () => {
    expect(parse("[$ [x]]", { hasTitle: false })).toMatchSnapshot();
  });

  // ref. https://github.com/progfay/scrapbox-parser/issues/1892
  it("Formula followed immediately by a decoration notation with trailing spaces", () => {
    expect(parse("[$ 1+1=2][. [link] ]", { hasTitle: false })).toMatchSnapshot();
  });
});
