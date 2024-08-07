import { describe, expect, it } from "vitest";
import { parse } from "../../src/index.ts";

describe("link", () => {
	it("Simple absolute link", () => {
		expect(
			parse("https://example.com/", {
				hasTitle: false,
			}),
		).toMatchSnapshot();
	});

	it("Simple absolute link with ahead non-space character", () => {
		expect(
			parse("ahttps://example.com/", {
				hasTitle: false,
			}),
		).toMatchSnapshot();
	});

	it("Simple absolute link with bracket", () => {
		expect(
			parse("[https://example.com/]", {
				hasTitle: false,
			}),
		).toMatchSnapshot();
	});

	it("Simple root link", () => {
		expect(parse("[/project/page]", { hasTitle: false })).toMatchSnapshot();
	});

	it("Simple relative link", () => {
		expect(parse("[page]", { hasTitle: false })).toMatchSnapshot();
	});

	it("Link with content", () => {
		expect(
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
		).toMatchSnapshot();
	});

	it("Root and relative link path can include space", () => {
		expect(
			parse(
				`
[page name]
[/project/page name]
`.trim(),
				{ hasTitle: false },
			),
		).toMatchSnapshot();
	});

	it("Link with link", () => {
		expect(
			parse("[https://example.com https://example.com]", { hasTitle: false }),
		).toMatchSnapshot();
	});

	it("Link with GET parameters", () => {
		expect(
			parse("[http://example.com?key1=value1&key2=value2]", {
				hasTitle: false,
			}),
		).toMatchSnapshot();
	});
});
