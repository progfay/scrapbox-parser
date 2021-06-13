describe("hashTag", () => {
  it("Simple hashTag", () => {
    expect("#tag").toMatchSnapshotWhenParsing({ hasTitle: false });
  });

  it("Only `#` is not hashTag", () => {
    expect("#").toMatchSnapshotWhenParsing({ hasTitle: false });
  });

  it("HashTag includes `#`", () => {
    expect("#hash#Tag").toMatchSnapshotWhenParsing({ hasTitle: false });
  });

  it("HashTag in sentence with spaces", () => {
    expect("This is a #tag .").toMatchSnapshotWhenParsing({ hasTitle: false });
  });

  it("HashTag in sentence without spaces is not hashTag", () => {
    expect("→#notTag←").toMatchSnapshotWhenParsing({ hasTitle: false });
  });

  it("Multiple hashTag", () => {
    expect("#hoge #fuga #piyo").toMatchSnapshotWhenParsing({ hasTitle: false });
  });
});
