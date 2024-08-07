import { describe, expect, it } from "vitest";
import {
	type Decoration,
	type DecorationNode,
	type Line,
	parse,
} from "../../src/index.ts";

describe("decoration", () => {
	it("Simple decoration", () => {
		expect(
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
		).toMatchSnapshot();
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
		expect(new Set<Decoration>(received)).toEqual(new Set<Decoration>(decos));
	});

	it("Decoration * overflow", () => {
		expect(parse("[*********** 11*]", { hasTitle: false })).toMatchSnapshot();
	});

	it("Decoration similar with externalLink", () => {
		expect(
			parse("[* hoge https://example.com]", {
				hasTitle: false,
			}),
		).toMatchSnapshot();
	});

	it("Decoration with hashTag", () => {
		expect(
			parse("[* #tag]", {
				hasTitle: false,
			}),
		).toMatchSnapshot();
	});

	it("Decoration with many [", () => {
		expect(parse("[! [[[[[[a]", { hasTitle: false })).toMatchSnapshot();
	});

	it("Decoration with many [ and link", () => {
		expect(parse("[! [[[[[[a]]", { hasTitle: false })).toMatchSnapshot();
	});

	it("Decoration with strong notation (it's just link)", () => {
		expect(parse("[* [[link]]]", { hasTitle: false })).toMatchSnapshot();
	});

	it("Decoration with icon notation", () => {
		expect(
			parse("[* [progfay.icon]]", {
				hasTitle: false,
			}),
		).toMatchSnapshot();
	});

	it("Decoration with strong icon notation (it's just icon, not strong)", () => {
		expect(
			parse("[* [[progfay.icon]]]", { hasTitle: false }),
		).toMatchSnapshot();
	});

	it("Decoration with strong image notation (it's just image, not strong)", () => {
		expect(
			parse("[* [[https://example.com/image.png]]]", {
				hasTitle: false,
			}),
		).toMatchSnapshot();
	});
});
