import { describe, it } from "node:test";
import { parse } from "../../src/index.ts";

describe("quote", () => {
	it("Simple quote", ({ assert }) => {
		assert.snapshot(parse("> Simple quote", { hasTitle: false }));
	});

	it("Empty quote", ({ assert }) => {
		assert.snapshot(parse(">", { hasTitle: false }));
	});
});
