/* eslint-disable no-tabs, no-irregular-whitespace */

describe("Table", () => {
  it("Simple table", () => {
    expect(`table:hello
${"\t"}1${"\t"}2${"\t"}3
${"\t"}1 ${"\t"}2 ${"\t"}3
${"\t"}------${"\t"}------${"\t"}------
${"\t"}a${"\t"}b${"\t"}c`).toMatchSnapshotWhenParsing({ hasTitle: false });
  });

  it("Bulleted table", () => {
    expect(` table:bulleted
 ${"\t"}1${"\t"}2${"\t"}3
 ${"\t"}1 ${"\t"}2 ${"\t"}3
 ${"\t"}------${"\t"}------${"\t"}------
 ${"\t"}a${"\t"}b${"\t"}c`).toMatchSnapshotWhenParsing({ hasTitle: false });
  });

  it("Table with empty cells", () => {
    expect(`table:${" "}
${"\t"} ${"\t"}　${"\t"}${"  "}
${"\t"}${"\t"}${"\t"}`).toMatchSnapshotWhenParsing({ hasTitle: false });
  });

  it("Staggered table", () => {
    expect(`table:Staggered
${"\t"}1${"\t"}2${"\t"}3${"\t"}4
${"\t"}1${"\t"}2${"\t"}3
${"\t"}1
${"\t"}1${"\t"}2
${"\t"}`).toMatchSnapshotWhenParsing({ hasTitle: false });
  });

  it("Consecutive table", () => {
    expect(`table:hello
${"\t"}1${"\t"}2${"\t"}3
${"\t"}1 ${"\t"}2 ${"\t"}3
${"\t"}------${"\t"}------${"\t"}------
${"\t"}a${"\t"}b${"\t"}c
table:hello
${"\t"}1${"\t"}2${"\t"}3
${"\t"}1 ${"\t"}2 ${"\t"}3
${"\t"}------${"\t"}------${"\t"}------
${"\t"}a${"\t"}b${"\t"}c`).toMatchSnapshotWhenParsing({ hasTitle: false });
  });

  it("Node in table cells", () => {
    expect(`table:node in table cells
${"\t"}#hashtag
${"\t"}[* deco]
${"\t"}[ ]
${"\t"}\`code\`
${"\t"}https://external.com
${"\t"}[https://external.com]
${"\t"}[left https://external.com]
${"\t"}[https://external.com right]
${"\t"}[$ x]
${"\t"}[N35.6812362,E139.7649361]
${"\t"}#hashTag
${"\t"}? helpfeel
${"\t"}$ commandLine
${"\t"}[progfay.icon]
${"\t"}[https://image.com/image.png]
${"\t"}[link]
${"\t"}plain
${"\t"}> quote
${"\t"}[[progfay.icon]]
${"\t"}[[https://image.com/image.png]]
${"\t"}[[strong]]`).toMatchSnapshotWhenParsing({
      hasTitle: false,
    });
  });
});
