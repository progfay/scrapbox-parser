import { describe, expect, it } from "vitest";
import { parse } from "../../src";

describe("hashTag", () => {
	it("Simple hashTag", () => {
		expect(parse("#tag", { hasTitle: false })).toMatchSnapshot();
	});

	it("Only `#` is not hashTag", () => {
		expect(parse("#", { hasTitle: false })).toMatchSnapshot();
	});

	it("HashTag includes `#`", () => {
		expect(parse("#hash#Tag", { hasTitle: false })).toMatchSnapshot();
	});

	it("HashTag in sentence with spaces", () => {
		expect(parse("This is a #tag .", { hasTitle: false })).toMatchSnapshot();
	});

	it("HashTag in sentence without spaces is not hashTag", () => {
		expect(parse("→#notTag←", { hasTitle: false })).toMatchSnapshot();
	});

	it("Multiple hashTag", () => {
		expect(parse("#hoge #fuga #piyo", { hasTitle: false })).toMatchSnapshot();
	});
});
