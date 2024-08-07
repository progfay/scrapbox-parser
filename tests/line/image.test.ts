import { describe, it } from "node:test";
import { parse } from "../../src/index.ts";

describe("image", () => {
	it("Simple image", ({ assert }) => {
		assert.snapshot(
			parse(
				`
[http://example.com/image.png]
[https://example.com/image.JPG]
`.trim(),
				{
					hasTitle: false,
				},
			),
		);
	});

	it("HTTP jpeg image with special and japanese chars", ({ assert }) => {
		assert.snapshot(
			parse("[http://example.com/~!@#$%^&*()_+`-={}\\'\"?,.<>|/画像.jpeg]", {
				hasTitle: false,
			}),
		);
	});

	it("HTTPS svg, GIF and WebP image with link", ({ assert }) => {
		assert.snapshot(
			parse(
				`
[https://example.com/image.svg https://example.com/]
[https://example.com/ https://example.com/image.GIF]
[https://example.com/image.webp https://example.com]
`.trim(),
				{
					hasTitle: false,
				},
			),
		);
	});

	it("Image with double image link", ({ assert }) => {
		assert.snapshot(
			parse(
				"[https://example.com/forward.png https://example.com/backward.png]",
				{ hasTitle: false },
			),
		);
	});

	it("Gyazo image", ({ assert }) => {
		assert.snapshot(
			parse(
				`
[https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815]
[https://i.gyazo.com/0f82099330f378fe4917a1b4a5fe8815]
[https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815/raw]
`.trim(),
				{ hasTitle: false },
			),
		);
	});

	it("Gyazo image with link", ({ assert }) => {
		assert.snapshot(
			parse(
				`
[https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815 https://example.com]
[https://example.com https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815]
[https://gyazo.com/7057219f5b20ca8afd122945b72453d3 https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815]
`.trim(),
				{ hasTitle: false },
			),
		);
	});

	it("Image with GET parameters", ({ assert }) => {
		assert.snapshot(
			parse("[http://example.com/image.png?key1=value1&key2=value2]", {
				hasTitle: false,
			}),
		);
	});

	it("Direct Gyazo image", ({ assert }) => {
		assert.snapshot(
			parse("[https://i.gyazo.com/0f82099330f378fe4917a1b4a5fe8815.png]", {
				hasTitle: false,
			}),
		);
	});
});
