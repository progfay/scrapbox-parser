import { describe, it } from "node:test";
import { parse } from "../../src/index.ts";

describe("icon", () => {
	it("Simple root icon", ({ assert }) => {
		assert.snapshot(parse("[/icons/+1.icon]", { hasTitle: false }));
	});

	it("Simple relative icon", ({ assert }) => {
		assert.snapshot(parse("[me.icon]", { hasTitle: false }));
	});

	it("Multiple icons", ({ assert }) => {
		assert.snapshot(parse("[me.icon*3]", { hasTitle: false }));
	});

	it("Icon and internal link on same line", ({ assert }) => {
		assert.snapshot(
			parse("[Internal link][me.icon]", {
				hasTitle: false,
			}),
		);
	});

	it("Each multiple icon must be different Object", ({ assert }) => {
		const [block] = parse("[me.icon*2]", { hasTitle: false });

		if (block === undefined || block.type !== "line") {
			throw new Error("fail");
		}

		assert.strictEqual(block.nodes.length, 2);
		assert.deepStrictEqual(block.nodes[0], block.nodes[1]);
	});
});
