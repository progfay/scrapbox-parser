describe("numberList", () => {
  it("Simple numberList", () => {
    expect("1. Simple numberList").toMatchSnapshotWhenParsing({
      hasTitle: false,
    });
  });

  it("1. with no space is not numberList", () => {
    expect("1.").toMatchSnapshotWhenParsing({
      hasTitle: false,
    });
    expect("1.not numberList").toMatchSnapshotWhenParsing({
      hasTitle: false,
    });
  });

  it("No head 1. is not numberList", () => {
    expect("a 1. not numberList").toMatchSnapshotWhenParsing({
      hasTitle: false,
    });
  });

  it("Quoted 1. is not numberList", () => {
    expect("> 1. Quoted").toMatchSnapshotWhenParsing({ hasTitle: false });
  });
});
