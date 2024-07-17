import { describe, it, expect } from "vitest";
import { parse } from "../../src";

describe("commandLine", () => {
  it("Simple command with $", () => {
    expect(parse("$ command", { hasTitle: false })).toMatchSnapshot();
  });

  it("Simple command with %", () => {
    expect(parse("% command", { hasTitle: false })).toMatchSnapshot();
  });

  it("`$` is not command", () => {
    expect(parse("$", { hasTitle: false })).toMatchSnapshot();
  });

  it("`$ ` is not command", () => {
    expect(parse("$ ", { hasTitle: false })).toMatchSnapshot();
  });

  it("`$s` is not command", () => {
    expect(parse("$not command", { hasTitle: false })).toMatchSnapshot();
  });
});
