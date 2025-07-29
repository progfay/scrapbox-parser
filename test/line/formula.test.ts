import { describe, it } from "node:test";
import { parse } from "../../src/index.ts";

describe("formula", () => {
	it("Simple formula", ({ assert }) => {
		assert.snapshot(
			parse("[$ \\frac{3}{2}^N]", {
				hasTitle: false,
			}),
		);
	});

	it("Formula includes [] with tail half-space", ({ assert }) => {
		assert.snapshot(parse("[$ [x] ]", { hasTitle: false }));
	});

	it("Formula includes [] without tail half-space", ({ assert }) => {
		assert.snapshot(parse("[$ [x]]", { hasTitle: false }));
	});

	// ref. https://github.com/progfay/scrapbox-parser/issues/1892
	it("Formula followed immediately by a decoration notation with trailing spaces", ({
		assert,
	}) => {
		assert.snapshot(parse("[$ 1+1=2][. [link] ]", { hasTitle: false }));
	});
});
