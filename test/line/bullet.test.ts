import { describe, it } from "node:test";
import { parse } from "../../src/index.ts";

describe("bullet", () => {
	it("Single-byte space indent", ({ assert }) => {
		assert.snapshot(
			parse(" Single-byte space", {
				hasTitle: false,
			}),
		);
	});

	it("Double-byte space indent", ({ assert }) => {
		assert.snapshot(
			parse("　Double-byte space", {
				hasTitle: false,
			}),
		);
	});

	it("Tab indent", ({ assert }) => {
		// eslint-disable-next-line no-tabs
		assert.snapshot(parse("	Tab", { hasTitle: false }));
	});

	it("Multi lines bullet", ({ assert }) => {
		assert.snapshot(
			parse(
				`
no bullet (indent: 0)
 first bullet (indent: 1)
  second bullet (indent: 2)
   third bullet (indent: 3)
`.trim(),
				{ hasTitle: false },
			),
		);
	});
});
