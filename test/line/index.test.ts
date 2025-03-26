import { describe, it } from "node:test";
import { parse } from "../../src/index.ts";

describe("line", () => {
	it("Line that have multi node", ({ assert }) => {
		assert.snapshot(parse("[Link][Link]", { hasTitle: false }));
	});

	it("Decoration line includes internal link", ({ assert }) => {
		assert.snapshot(parse("[* [Link]]", { hasTitle: false }));
	});

	it("Decoration line includes external link", ({ assert }) => {
		assert.snapshot(
			parse("[* [https://example.com example]]", {
				hasTitle: false,
			}),
		);
	});

	it("Multi `]`", ({ assert }) => {
		assert.snapshot(
			parse("[* [Link]`code`[Link]]", {
				hasTitle: false,
			}),
		);
	});
});
