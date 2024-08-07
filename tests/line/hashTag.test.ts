import { describe, it } from "node:test";
import { parse } from "../../src/index.ts";

describe("hashTag", () => {
	it("Simple hashTag", ({ assert }) => {
		assert.snapshot(parse("#tag", { hasTitle: false }));
	});

	it("Only `#` is not hashTag", ({ assert }) => {
		assert.snapshot(parse("#", { hasTitle: false }));
	});

	it("HashTag includes `#`", ({ assert }) => {
		assert.snapshot(parse("#hash#Tag", { hasTitle: false }));
	});

	it("HashTag in sentence with spaces", ({ assert }) => {
		assert.snapshot(parse("This is a #tag .", { hasTitle: false }));
	});

	it("HashTag in sentence without spaces is not hashTag", ({ assert }) => {
		assert.snapshot(parse("→#notTag←", { hasTitle: false }));
	});

	it("Multiple hashTag", ({ assert }) => {
		assert.snapshot(parse("#hoge #fuga #piyo", { hasTitle: false }));
	});
});
