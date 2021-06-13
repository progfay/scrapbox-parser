import * as fs from "fs";

describe("page", () => {
  it("Empty page", () => {
    const input = "";
    expect(input).toMatchSnapshotWhenParsing({ hasTitle: true });
  });

  it("Title Block without `hasTitle` option", () => {
    const input = "Title";
    expect(input).toMatchSnapshotWhenParsing();
  });

  it("https://scrapbox.io/help/Syntax", () => {
    const input = fs.readFileSync("./tests/page/input.txt").toString();
    expect(input).toMatchSnapshotWhenParsing({ hasTitle: true });
  });
});
