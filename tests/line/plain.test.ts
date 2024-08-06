import { describe, expect, it } from "vitest";
import { parse } from "../../src";

describe("plain", () => {
	it("Simple plain text", () => {
		expect(parse("Plain text", { hasTitle: false })).toMatchSnapshot();
	});

	it("Blank line", () => {
		expect(parse("", { hasTitle: false })).toMatchSnapshot();
	});

	it("Keep tail space", () => {
		expect(parse("Tail space ->  ", { hasTitle: false })).toMatchSnapshot();
	});
});
