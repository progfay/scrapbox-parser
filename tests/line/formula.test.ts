describe("formula", () => {
  it("Simple formula", () => {
    expect("[$ \\frac{3}{2}^N]").toMatchSnapshotWhenParsing({
      hasTitle: false,
    });
  });

  it("Formula includes [] with tail half-space", () => {
    expect("[$ [x] ]").toMatchSnapshotWhenParsing({ hasTitle: false });
  });

  it("Formula includes [] without tail half-space", () => {
    expect("[$ [x]]").toMatchSnapshotWhenParsing({ hasTitle: false });
  });
});
