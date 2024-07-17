import * as fs from "node:fs";
import { describe, it, expect } from "vitest";
import { parse } from "../../src";

describe("page", () => {
  it("Empty page", () => {
    const input = "";
    expect(parse(input, { hasTitle: true })).toMatchSnapshot();
  });

  it("Title Block without `hasTitle` option", () => {
    const input = "Title";
    expect(parse(input)).toMatchSnapshot();
  });

  it("https://scrapbox.io/help/Syntax", () => {
    const input = fs.readFileSync("./tests/page/input.txt").toString();
    expect(parse(input, { hasTitle: true })).toMatchSnapshot();
  });
});
