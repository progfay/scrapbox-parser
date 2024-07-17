import { describe, it, expect } from "vitest";
import { parse } from "../../src";

describe("line", () => {
  it("Line that have multi node", () => {
    expect(parse("[Link][Link]", { hasTitle: false })).toMatchSnapshot();
  });

  it("Decoration line includes internal link", () => {
    expect(parse("[* [Link]]", { hasTitle: false })).toMatchSnapshot();
  });

  it("Decoration line includes external link", () => {
    expect(
      parse("[* [https://example.com example]]", {
        hasTitle: false,
      }),
    ).toMatchSnapshot();
  });

  it("Multi `]`", () => {
    expect(
      parse("[* [Link]`code`[Link]]", {
        hasTitle: false,
      }),
    ).toMatchSnapshot();
  });
});
