import { describe, it } from "node:test";
import { parse } from "../../src/index.ts";

describe("code", () => {
	it("Simple code with backquote", ({ assert }) => {
		assert.snapshot(parse("`Simple code`", { hasTitle: false }));
	});

	it("Empty code with backquote", ({ assert }) => {
		assert.snapshot(parse("``", { hasTitle: false }));
	});
});
