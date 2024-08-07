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
});
