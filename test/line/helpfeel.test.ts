import { describe, it } from "node:test";
import { parse } from "../../src/index.ts";

describe("helpfeel", () => {
	it("Simple helpfeel", ({ assert }) => {
		assert.snapshot(parse("? Simple helpfeel", { hasTitle: false }));
	});

	it("No head `?` is not helpfeel", ({ assert }) => {
		assert.snapshot(parse("a ? not helpfeel", { hasTitle: false }));
	});

	it("Quoted ? is not helpfeel", ({ assert }) => {
		assert.snapshot(parse("> ? Quoted", { hasTitle: false }));
	});
});
