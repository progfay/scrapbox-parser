import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getTitle } from "../../src/index.ts";

describe("title", () => {
	it("Get title from simple page", () => {
		const title = getTitle("title\nline\nline\n");
		assert.strictEqual(title, "title");
	});

	it("Get title from empty page", () => {
		assert.strictEqual(getTitle(""), "Untitled");
		assert.strictEqual(getTitle(" 　\t"), "Untitled");
		assert.strictEqual(getTitle("\n"), "Untitled");
		assert.strictEqual(getTitle("\n 　\t"), "Untitled");
	});

	it("Get title from title only page", () => {
		const title = getTitle("title");
		assert.strictEqual(title, "title");
	});

	it("Get title from huge page", () => {
		const title = getTitle(`${"  \n".repeat(10 ** 8)}title`);
		assert.strictEqual(title, "title");
	});
});
