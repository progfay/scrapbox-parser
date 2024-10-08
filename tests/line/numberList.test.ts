import { describe, expect, it } from "vitest";
import { parse } from "../../src/index.ts";

describe("numberList", () => {
	it("Minimum numberList", () => {
		expect(
			parse("1. ", {
				hasTitle: false,
			}),
		).toMatchSnapshot();
	});

	it("Simple numberList", () => {
		expect(
			parse("1. Simple numberList", {
				hasTitle: false,
			}),
		).toMatchSnapshot();
	});

	it("1. with decoration", () => {
		expect(parse("1. [* deco]", { hasTitle: false })).toMatchSnapshot();
	});

	it("1. with code", () => {
		expect(parse("1. `code`", { hasTitle: false })).toMatchSnapshot();
	});

	it("1. with no space is not numberList", () => {
		expect(
			parse("1.not numberList", {
				hasTitle: false,
			}),
		).toMatchSnapshot();
	});

	it("No head 1. is not numberList", () => {
		expect(
			parse("a 1. not numberList", {
				hasTitle: false,
			}),
		).toMatchSnapshot();
	});

	it("Quoted 1. is not numberList", () => {
		expect(parse("> 1. Quoted", { hasTitle: false })).toMatchSnapshot();
	});
});
