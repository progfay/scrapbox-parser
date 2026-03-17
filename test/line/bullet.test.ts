import { describe, expect, it } from "vite-plus/test";
import { parse } from "../../src/index.ts";

describe("bullet", () => {
  it("Single-byte space indent", () => {
    expect(
      parse(" Single-byte space", {
        hasTitle: false,
      }),
    ).toMatchSnapshot();
  });

  it("Double-byte space indent", () => {
    expect(
      parse("　Double-byte space", {
        hasTitle: false,
      }),
    ).toMatchSnapshot();
  });

  it("Tab indent", () => {
    expect(parse("	Tab", { hasTitle: false })).toMatchSnapshot();
  });

  it("Multi lines bullet", () => {
    expect(
      parse(
        `
no bullet (indent: 0)
 first bullet (indent: 1)
  second bullet (indent: 2)
   third bullet (indent: 3)
`.trim(),
        { hasTitle: false },
      ),
    ).toMatchSnapshot();
  });
});
