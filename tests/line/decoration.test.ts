import { deepStrictEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import {
	type Decoration,
	type DecorationNode,
	type Line,
	parse,
} from "../../src/index.ts";

describe("decoration", () => {
	it("Simple decoration", ({ assert }) => {
		assert.snapshot(
			parse(
				`
[* deco]
[** deco]
[*** deco]
[**** deco]
[***** deco]
[****** deco]
[******* deco]
[******** deco]
[********* deco]
[********** deco]
[! deco]
[" deco]
[# deco]
[% deco]
[& deco]
[' deco]
[( deco]
[) deco]
[+ deco]
[, deco]
[- deco]
[. deco]
[/ deco]
[{ deco]
[| deco]
[} deco]
[< deco]
[> deco]
[_ deco]
[~ deco]
`.trim(),
				{ hasTitle: false },
			),
		);
	});

	it("All decoration", () => {
		const input = "[**********!\"#%&'()*+,-./{|}<>_~ decos]";
		const blocks = parse(input, { hasTitle: false });
		const received = ((blocks[0] as Line).nodes[0] as DecorationNode).decos;
		const decos: Decoration[] = [
			"*-10",
			"!",
			'"',
			"#",
			"%",
			"&",
			"'",
			"(",
			")",
			"+",
			",",
			"-",
			".",
			"/",
			"{",
			"|",
			"}",
			"<",
			">",
			"_",
			"~",
		];
		deepStrictEqual(received.sort(), decos.sort());
	});

	it("Decoration * overflow", ({ assert }) => {
		assert.snapshot(parse("[*********** 11*]", { hasTitle: false }));
	});

	it("Decoration similar with externalLink", ({ assert }) => {
		assert.snapshot(
			parse("[* hoge https://example.com]", {
				hasTitle: false,
			}),
		);
	});

	it("Decoration with hashTag", ({ assert }) => {
		assert.snapshot(
			parse("[* #tag]", {
				hasTitle: false,
			}),
		);
	});

	it("Decoration with many [", ({ assert }) => {
		assert.snapshot(parse("[! [[[[[[a]", { hasTitle: false }));
	});

	it("Decoration with many [ and link", ({ assert }) => {
		assert.snapshot(parse("[! [[[[[[a]]", { hasTitle: false }));
	});

	it("Decoration with strong notation (it's just link)", ({ assert }) => {
		assert.snapshot(parse("[* [[link]]]", { hasTitle: false }));
	});

	it("Decoration with icon notation", ({ assert }) => {
		assert.snapshot(
			parse("[* [progfay.icon]]", {
				hasTitle: false,
			}),
		);
	});

	it("Decoration with strong icon notation (it's just icon, not strong)", ({
		assert,
	}) => {
		assert.snapshot(parse("[* [[progfay.icon]]]", { hasTitle: false }));
	});

	it("Decoration with strong image notation (it's just image, not strong)", ({
		assert,
	}) => {
		assert.snapshot(
			parse("[* [[https://example.com/image.png]]]", {
				hasTitle: false,
			}),
		);
	});
});
