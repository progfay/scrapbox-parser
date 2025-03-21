import { describe, expect, it } from "vitest";
import { parse } from "../../src/index.ts";

describe("image", () => {
	it("Simple image", () => {
		expect(
			parse(
				`
[http://example.com/image.png]
[https://example.com/image.JPG]
`.trim(),
				{
					hasTitle: false,
				},
			),
		).toMatchSnapshot();
	});

	it("HTTP jpeg image with special and japanese chars", () => {
		expect(
			parse("[http://example.com/~!@#$%^&*()_+`-={}\\'\"?,.<>|/画像.jpeg]", {
				hasTitle: false,
			}),
		).toMatchSnapshot();
	});

	it("HTTPS svg, GIF and WebP image with link", () => {
		expect(
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
		).toMatchSnapshot();
	});

	it("Image with double image link", () => {
		expect(
			parse(
				"[https://example.com/forward.png https://example.com/backward.png]",
				{ hasTitle: false },
			),
		).toMatchSnapshot();
	});

	it("Gyazo image", () => {
		expect(
			parse(
				`
[https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815]
[https://i.gyazo.com/0f82099330f378fe4917a1b4a5fe8815]
[https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815/raw]
`.trim(),
				{ hasTitle: false },
			),
		).toMatchSnapshot();
	});

	it("Gyazo image with link", () => {
		expect(
			parse(
				`
[https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815 https://example.com]
[https://example.com https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815]
[https://gyazo.com/7057219f5b20ca8afd122945b72453d3 https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815]
`.trim(),
				{ hasTitle: false },
			),
		).toMatchSnapshot();
	});

	it("Image with GET parameters", () => {
		expect(
			parse("[http://example.com/image.png?key1=value1&key2=value2]", {
				hasTitle: false,
			}),
		).toMatchSnapshot();
	});

	it("Direct Gyazo image", () => {
		expect(
			parse("[https://i.gyazo.com/0f82099330f378fe4917a1b4a5fe8815.png]", {
				hasTitle: false,
			}),
		).toMatchSnapshot();
	});
});
