/* eslint-disable no-irregular-whitespace */
import { describe, expect, it } from "vitest";
import { parse } from "../../src/index.ts";

describe("blank", () => {
	it("Simple half-space blank", () => {
		expect(parse("[ ]", { hasTitle: false })).toMatchSnapshot();
	});

	it("Simple double-byte space blank", () => {
		expect(parse("[　]", { hasTitle: false })).toMatchSnapshot();
	});

	it("Simple tab blank", () => {
		expect(parse("[\t]", { hasTitle: false })).toMatchSnapshot();
	});

	it("Multi char blank", () => {
		expect(parse("[ 　 \t　\t ]", { hasTitle: false })).toMatchSnapshot();
	});

	it("Blank in the sentence", () => {
		expect(
			parse("sentence[ ]sentence", {
				hasTitle: false,
			}),
		).toMatchSnapshot();
	});

	it("[] is not blank", () => {
		expect(parse("[]", { hasTitle: false })).toMatchSnapshot();
	});

	it("Blank in the [*** ]", () => {
		expect(parse("[*** [ ]]", { hasTitle: false })).toMatchSnapshot();
	});
});
