import { describe, expect, it } from "vitest";
import { parse } from "../../src/index.ts";

describe("strong", () => {
	it("Simple strong", () => {
		expect(parse("[[Simple strong]]", { hasTitle: false })).toMatchSnapshot();
	});

	it("[[]] is not strong", () => {
		expect(parse("[[]]", { hasTitle: false })).toMatchSnapshot();
	});

	it("Decoration in Strong notation", () => {
		expect(parse("[[[! deco]]]", { hasTitle: false })).toMatchSnapshot();
	});
});
