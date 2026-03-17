import { describe, expect, it } from "vite-plus/test";
import { getTitle } from "../../src/index.ts";

describe("title", () => {
  it("Get title from simple page", () => {
    const title = getTitle("title\nline\nline\n");
    expect(title).toBe("title");
  });

  it("Get title from empty page", () => {
    expect(getTitle("")).toBe("Untitled");
    expect(getTitle(" 　\t")).toBe("Untitled");
    expect(getTitle("\n")).toBe("Untitled");
    expect(getTitle("\n 　\t")).toBe("Untitled");
  });

  it("Get title from title only page", () => {
    const title = getTitle("title");
    expect(title).toBe("title");
  });

  it("Get title from huge page", () => {
    const title = getTitle(`${"  \n".repeat(10 ** 8)}title`);
    expect(title).toBe("title");
  });
});
