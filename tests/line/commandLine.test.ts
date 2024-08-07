import { describe, expect, it } from "vitest";
import { parse } from "../../src/index.ts";

describe("commandLine", () => {
	it("Simple command with $", () => {
		expect(parse("$ command", { hasTitle: false })).toMatchSnapshot();
	});

	it("Simple command with %", () => {
		expect(parse("% command", { hasTitle: false })).toMatchSnapshot();
	});

	it("`$` is not command", () => {
		expect(parse("$", { hasTitle: false })).toMatchSnapshot();
	});

	it("`$ ` is not command", () => {
		expect(parse("$ ", { hasTitle: false })).toMatchSnapshot();
	});

	it("`$s` is not command", () => {
		expect(parse("$not command", { hasTitle: false })).toMatchSnapshot();
	});
});
