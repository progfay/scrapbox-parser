describe("quote", () => {
  it("Simple quote", () => {
    expect("> Simple quote").toMatchSnapshotWhenParsing({ hasTitle: false });
  });

  it("Empty quote", () => {
    expect(">").toMatchSnapshotWhenParsing({ hasTitle: false });
  });
});
