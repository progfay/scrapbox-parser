import { describe, expect, it } from "vite-plus/test";
import { parse } from "../../src/index.ts";

describe("plain", () => {
  it("Simple plain text", () => {
    expect(parse("Plain text", { hasTitle: false })).toMatchSnapshot();
  });

  it("Blank line", () => {
    expect(parse("", { hasTitle: false })).toMatchSnapshot();
  });

  it("Keep tail space", () => {
    expect(parse("Tail space ->  ", { hasTitle: false })).toMatchSnapshot();
  });
});
