import { parse, Line, Decoration, DecorationNode } from "../../src";

describe("decoration", () => {
  it("Simple decoration", () => {
    expect(`[* deco]
[** deco]
[*** deco]
[**** deco]
[***** deco]
[****** deco]
[******* deco]
[******** deco]
[********* deco]
[********** deco]
[! deco]
[" deco]
[# deco]
[% deco]
[& deco]
[' deco]
[( deco]
[) deco]
[+ deco]
[, deco]
[- deco]
[. deco]
[/ deco]
[{ deco]
[| deco]
[} deco]
[< deco]
[> deco]
[_ deco]
[~ deco]`).toMatchSnapshotWhenParsing({ hasTitle: false });
  });

  it("All decoration", () => {
    const input = "[**********!\"#%&'()*+,-./{|}<>_~ decos]";
    const blocks = parse(input, { hasTitle: false });
    const received = ((blocks[0] as Line).nodes[0] as DecorationNode).decos;
    const decos: Decoration[] = [
      "*-10",
      "!",
      '"',
      "#",
      "%",
      "&",
      "'",
      "(",
      ")",
      "+",
      ",",
      "-",
      ".",
      "/",
      "{",
      "|",
      "}",
      "<",
      ">",
      "_",
      "~",
    ];
    expect(new Set<Decoration>(received)).toEqual(new Set<Decoration>(decos));
  });

  it("Decoration * overflow", () => {
    expect("[*********** 11*]").toMatchSnapshotWhenParsing({ hasTitle: false });
  });

  it("Decoration similar with externalLink", () => {
    expect("[* hoge https://example.com]").toMatchSnapshotWhenParsing({
      hasTitle: false,
    });
  });

  it("Decoration with hashTag", () => {
    expect("[* #tag]").toMatchSnapshotWhenParsing({
      hasTitle: false,
    });
  });

  it("Decoration with many [", () => {
    expect("[! [[[[[[a]").toMatchSnapshotWhenParsing({ hasTitle: false });
  });

  it("Decoration with many [ and link", () => {
    expect("[! [[[[[[a]]").toMatchSnapshotWhenParsing({ hasTitle: false });
  });

  it("Decoration with strong notation (it's just link)", () => {
    expect("[* [[link]]]").toMatchSnapshotWhenParsing({ hasTitle: false });
  });

  it("Decoration with icon notation", () => {
    expect("[* [progfay.icon]]").toMatchSnapshotWhenParsing({
      hasTitle: false,
    });
  });

  it("Decoration with strong icon notation (it's just icon, not strong)", () => {
    expect("[* [[progfay.icon]]]").toMatchSnapshotWhenParsing({
      hasTitle: false,
    });
  });

  it("Decoration with strong image notation (it's just image, not strong)", () => {
    expect("[* [[https://example.com/image.png]]]").toMatchSnapshotWhenParsing({
      hasTitle: false,
    });
  });
});
