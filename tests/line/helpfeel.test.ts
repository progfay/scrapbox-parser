import { describe, it, expect } from "vitest";
import { parse } from "../../src";

describe("helpfeel", () => {
  it("Simple helpfeel", () => {
    expect(parse("? Simple helpfeel", { hasTitle: false })).toMatchSnapshot();
  });

  it("No head `?` is not helpfeel", () => {
    expect(parse("a ? not helpfeel", { hasTitle: false })).toMatchSnapshot();
  });

  it("Quoted ? is not helpfeel", () => {
    expect(parse("> ? Quoted", { hasTitle: false })).toMatchSnapshot();
  });
});
