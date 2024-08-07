import { describe, it } from "node:test";
import { parse } from "../../src/index.ts";

describe("strongImage", () => {
	it("Simple strong image", ({ assert }) => {
		assert.snapshot(
			parse(
				`
[[http://example.com/image.png]]
[[https://example.com/image.JPG]]
[[https://example.com/image.svg]]
[[https://example.com/image.GIF]]
[[https://example.com/image.webp]]
`.trim(),
				{
					hasTitle: false,
				},
			),
		);
	});

	it("HTTP jpeg strong image with special and japanese chars", ({ assert }) => {
		assert.snapshot(
			parse("[[http://example.com/~!@#$%^&*()_+`-={}\\'\"?,.<>|/画像.jpeg]]", {
				hasTitle: false,
			}),
		);
	});

	it("Gyazo image", ({ assert }) => {
		assert.snapshot(
			parse("[[https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815]]", {
				hasTitle: false,
			}),
		);
	});

	it("Direct Gyazo image", ({ assert }) => {
		assert.snapshot(
			parse("[[https://i.gyazo.com/0f82099330f378fe4917a1b4a5fe8815.png]]", {
				hasTitle: false,
			}),
		);
	});
});
