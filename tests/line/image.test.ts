describe("image", () => {
  it("Simple image", () => {
    expect(`[http://example.com/image.png]
[https://example.com/image.JPG]`).toMatchSnapshotWhenParsing({
      hasTitle: false,
    });
  });

  it("HTTP jpeg image with special and japanese chars", () => {
    expect(
      "[http://example.com/~!@#$%^&*()_+`-={}\\'\"?,.<>|/画像.jpeg]",
    ).toMatchSnapshotWhenParsing({ hasTitle: false });
  });

  it("HTTPS svg and GIF image with link", () => {
    expect(`[https://example.com/image.svg https://example.com/]
[https://example.com/ https://example.com/image.GIF]`).toMatchSnapshotWhenParsing(
      {
        hasTitle: false,
      },
    );
  });

  it("Image with double image link", () => {
    expect(
      "[https://example.com/forward.png https://example.com/backward.png]",
    ).toMatchSnapshotWhenParsing({ hasTitle: false });
  });

  it("Gyazo image", () => {
    expect(`[https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815]
[https://i.gyazo.com/0f82099330f378fe4917a1b4a5fe8815]
[https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815/raw]`).toMatchSnapshotWhenParsing(
      {
        hasTitle: false,
      },
    );
  });

  it("Gyazo image with link", () => {
    expect(`[https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815 https://example.com]
[https://example.com https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815]
[https://gyazo.com/7057219f5b20ca8afd122945b72453d3 https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815]`).toMatchSnapshotWhenParsing(
      { hasTitle: false },
    );
  });

  it("Image with GET parameters", () => {
    expect(
      "[http://example.com/image.png?key1=value1&key2=value2]",
    ).toMatchSnapshotWhenParsing({
      hasTitle: false,
    });
  });

  it("Direct Gyazo image", () => {
    expect(
      "[https://i.gyazo.com/0f82099330f378fe4917a1b4a5fe8815.png]",
    ).toMatchSnapshotWhenParsing({ hasTitle: false });
  });
});
