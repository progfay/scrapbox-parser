import { describe, it } from "node:test";
import { parse } from "../../src/index.ts";

describe("link", () => {
	it("Simple absolute link", ({ assert }) => {
		assert.snapshot(
			parse("https://example.com/", {
				hasTitle: false,
			}),
		);
	});

	it("Simple absolute link with ahead non-space character", ({ assert }) => {
		assert.snapshot(
			parse("ahttps://example.com/", {
				hasTitle: false,
			}),
		);
	});

	it("Simple absolute link with bracket", ({ assert }) => {
		assert.snapshot(
			parse("[https://example.com/]", {
				hasTitle: false,
			}),
		);
	});

	it("Simple root link", ({ assert }) => {
		assert.snapshot(parse("[/project/page]", { hasTitle: false }));
	});

	it("Simple relative link", ({ assert }) => {
		assert.snapshot(parse("[page]", { hasTitle: false }));
	});

	it("Link with content", ({ assert }) => {
		assert.snapshot(
			parse(
				`
[https://example.com/   Example]
[Example   https://example.com/]
[https://left.com/ center https://right.com/]
`.trim(),
				{
					hasTitle: false,
				},
			),
		);
	});

	it("Root and relative link path can include space", ({ assert }) => {
		assert.snapshot(
			parse(
				`
[page name]
[/project/page name]
`.trim(),
				{ hasTitle: false },
			),
		);
	});

	it("Link with link", ({ assert }) => {
		assert.snapshot(
			parse("[https://example.com https://example.com]", { hasTitle: false }),
		);
	});

	it("Link with GET parameters", ({ assert }) => {
		assert.snapshot(
			parse("[http://example.com?key1=value1&key2=value2]", {
				hasTitle: false,
			}),
		);
	});
});
