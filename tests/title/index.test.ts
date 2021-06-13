import { getTitle } from "../../src";

describe("title", () => {
  it("Get title from simple page", () => {
    const title = getTitle("title\nline\nline\n");
    expect(title).toEqual("title");
  });

  it("Get title from empty page", () => {
    expect(getTitle("")).toEqual("Untitled");
    expect(getTitle(" 　\t")).toEqual("Untitled");
    expect(getTitle("\n")).toEqual("Untitled");
    expect(getTitle("\n 　\t")).toEqual("Untitled");
  });

  it("Get title from title only page", () => {
    const title = getTitle("title");
    expect(title).toEqual("title");
  });

  it("Get title from huge page", () => {
    const title = getTitle("  \n".repeat(10 ** 8) + "title");
    expect(title).toEqual("title");
  });
});
