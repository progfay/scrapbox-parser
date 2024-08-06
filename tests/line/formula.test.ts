import { describe, expect, it } from "vitest";
import { parse } from "../../src";

describe("formula", () => {
	it("Simple formula", () => {
		expect(
			parse("[$ \\frac{3}{2}^N]", {
				hasTitle: false,
			}),
		).toMatchSnapshot();
	});

	it("Formula includes [] with tail half-space", () => {
		expect(parse("[$ [x] ]", { hasTitle: false })).toMatchSnapshot();
	});

	it("Formula includes [] without tail half-space", () => {
		expect(parse("[$ [x]]", { hasTitle: false })).toMatchSnapshot();
	});
});
