import { describe, it } from "node:test";
import { parse } from "../../src/index.ts";

describe("blank", () => {
	it("Simple half-space blank", ({ assert }) => {
		assert.snapshot(parse("[ ]", { hasTitle: false }));
	});

	it("Simple double-byte space blank", ({ assert }) => {
		assert.snapshot(parse("[　]", { hasTitle: false }));
	});

	it("Simple tab blank", ({ assert }) => {
		assert.snapshot(parse("[\t]", { hasTitle: false }));
	});

	it("Multi char blank", ({ assert }) => {
		assert.snapshot(parse("[ 　 \t　\t ]", { hasTitle: false }));
	});

	it("Blank in the sentence", ({ assert }) => {
		assert.snapshot(
			parse("sentence[ ]sentence", {
				hasTitle: false,
			}),
		);
	});

	it("[] is not blank", ({ assert }) => {
		assert.snapshot(parse("[]", { hasTitle: false }));
	});

	it("Blank in the [*** ]", ({ assert }) => {
		assert.snapshot(parse("[*** [ ]]", { hasTitle: false }));
	});
});
