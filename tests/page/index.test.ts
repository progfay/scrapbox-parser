import * as fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { parse } from "../../src/index.ts";

describe("page", () => {
	it("Empty page", () => {
		const input = "";
		expect(parse(input, { hasTitle: true })).toMatchSnapshot();
	});

	it("Title Block without `hasTitle` option", () => {
		const input = "Title";
		expect(parse(input)).toMatchSnapshot();
	});

	it("https://scrapbox.io/help/Syntax", () => {
		const input = fs
			.readFileSync(path.resolve("tests/page/input.txt"))
			.toString();
		expect(parse(input, { hasTitle: true })).toMatchSnapshot();
	});
});
