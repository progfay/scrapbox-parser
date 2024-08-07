import * as fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import { parse } from "../../src/index.ts";

describe("page", () => {
	it("Empty page", ({ assert }) => {
		const input = "";
		assert.snapshot(parse(input, { hasTitle: true }));
	});

	it("Title Block without `hasTitle` option", ({ assert }) => {
		const input = "Title";
		assert.snapshot(parse(input));
	});

	it("https://scrapbox.io/help/Syntax", ({ assert }) => {
		const input = fs
			.readFileSync(path.resolve("tests/page/input.txt"))
			.toString();
		assert.snapshot(parse(input, { hasTitle: true }));
	});
});
