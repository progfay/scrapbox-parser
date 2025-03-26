import { describe, it } from "node:test";
import { parse } from "../../src/index.ts";

describe("strong", () => {
	it("Simple strong", ({ assert }) => {
		assert.snapshot(parse("[[Simple strong]]", { hasTitle: false }));
	});

	it("[[]] is not strong", ({ assert }) => {
		assert.snapshot(parse("[[]]", { hasTitle: false }));
	});

	it("Decoration in Strong notation", ({ assert }) => {
		assert.snapshot(parse("[[[! deco]]]", { hasTitle: false }));
	});
});
