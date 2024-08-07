import { describe, it } from "node:test";
import { parse } from "../../src/index.ts";

describe("commandLine", () => {
	it("Simple command with $", ({ assert }) => {
		assert.snapshot(parse("$ command", { hasTitle: false }));
	});

	it("Simple command with %", ({ assert }) => {
		assert.snapshot(parse("% command", { hasTitle: false }));
	});

	it("`$` is not command", ({ assert }) => {
		assert.snapshot(parse("$", { hasTitle: false }));
	});

	it("`$ ` is not command", ({ assert }) => {
		assert.snapshot(parse("$ ", { hasTitle: false }));
	});

	it("`$s` is not command", ({ assert }) => {
		assert.snapshot(parse("$not command", { hasTitle: false }));
	});
});
