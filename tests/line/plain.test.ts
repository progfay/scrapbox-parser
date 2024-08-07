import { describe, it } from "node:test";
import { parse } from "../../src/index.ts";

describe("plain", () => {
	it("Simple plain text", ({ assert }) => {
		assert.snapshot(parse("Plain text", { hasTitle: false }));
	});

	it("Blank line", ({ assert }) => {
		assert.snapshot(parse("", { hasTitle: false }));
	});

	it("Keep tail space", ({ assert }) => {
		assert.snapshot(parse("Tail space ->  ", { hasTitle: false }));
	});
});
