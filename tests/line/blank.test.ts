/* eslint-disable no-irregular-whitespace */

describe("blank", () => {
  it("Simple half-space blank", () => {
    expect("[ ]").toMatchSnapshotWhenParsing({ hasTitle: false });
  });

  it("Simple double-byte space blank", () => {
    expect("[　]").toMatchSnapshotWhenParsing({ hasTitle: false });
  });

  it("Simple tab blank", () => {
    expect("[\t]").toMatchSnapshotWhenParsing({ hasTitle: false });
  });

  it("Multi char blank", () => {
    expect("[ 　 \t　\t ]").toMatchSnapshotWhenParsing({ hasTitle: false });
  });

  it("Blank in the sentence", () => {
    expect("sentence[ ]sentence").toMatchSnapshotWhenParsing({
      hasTitle: false,
    });
  });

  it("[] is not blank", () => {
    expect("[]").toMatchSnapshotWhenParsing({ hasTitle: false });
  });

  it("Blank in the [*** ]", () => {
    expect("[*** [ ]]").toMatchSnapshotWhenParsing({ hasTitle: false });
  });
});
