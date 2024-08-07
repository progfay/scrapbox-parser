import { describe, expect, it } from "vitest";
import { parse } from "../../src/index.ts";

describe("strongImage", () => {
	it("Simple strong image", () => {
		expect(
			parse(
				`
[[http://example.com/image.png]]
[[https://example.com/image.JPG]]
[[https://example.com/image.svg]]
[[https://example.com/image.GIF]]
`.trim(),
				{
					hasTitle: false,
				},
			),
		).toMatchSnapshot();
	});

	it("HTTP jpeg strong image with special and japanese chars", () => {
		expect(
			parse("[[http://example.com/~!@#$%^&*()_+`-={}\\'\"?,.<>|/画像.jpeg]]", {
				hasTitle: false,
			}),
		).toMatchSnapshot();
	});

	it("Gyazo image", () => {
		expect(
			parse("[[https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815]]", {
				hasTitle: false,
			}),
		).toMatchSnapshot();
	});

	it("Direct Gyazo image", () => {
		expect(
			parse("[[https://i.gyazo.com/0f82099330f378fe4917a1b4a5fe8815.png]]", {
				hasTitle: false,
			}),
		).toMatchSnapshot();
	});
});
