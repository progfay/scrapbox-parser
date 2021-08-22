describe("youtube", () => {
  it("Youtube URL", () => {
    expect(
      "[https://youtube.com/watch?v=Sv3xVOs7_No]"
    ).toMatchSnapshotWhenParsing({
      hasTitle: false,
    });
  });

  it("Youtube short URL", () => {
    expect("[https://youtu.be/Sv3xVOs7_No]").toMatchSnapshotWhenParsing({
      hasTitle: false,
    });
  });

  it("Youtube watch list URL", () => {
    expect(
      "[https://www.youtube.com/playlist?list=PLmoRDY8IgE2OTDG7rVwVLd-szijCAZyZC]"
    ).toMatchSnapshotWhenParsing({
      hasTitle: false,
    });
  });
});
