import { describe, expect, it } from "vitest";
import { parse } from "../../src/index.ts";

describe("quote", () => {
	it("Simple quote", () => {
		expect(parse("> Simple quote", { hasTitle: false })).toMatchSnapshot();
	});

	it("Empty quote", () => {
		expect(parse(">", { hasTitle: false })).toMatchSnapshot();
	});
});
