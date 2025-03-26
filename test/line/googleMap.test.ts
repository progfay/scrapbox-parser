import { describe, it } from "node:test";
import { parse } from "../../src/index.ts";

describe("googleMap", () => {
	it("Simple google map with NE", ({ assert }) => {
		assert.snapshot(
			parse("[N35.6812362,E139.7649361]", {
				hasTitle: false,
			}),
		);
	});

	it("Simple google map with SW", ({ assert }) => {
		assert.snapshot(
			parse("[S13.70533,W69.6533372]", {
				hasTitle: false,
			}),
		);
	});

	it("Simple google map with zoom", ({ assert }) => {
		assert.snapshot(
			parse("[N35.6812362,E139.7649361,Z14]", {
				hasTitle: false,
			}),
		);
	});

	it("Simple google map with place on left", ({ assert }) => {
		assert.snapshot(
			parse("[東京駅 N35.6812362,E139.7649361,Z14]", {
				hasTitle: false,
			}),
		);
	});

	it("Simple google map with place on right", ({ assert }) => {
		assert.snapshot(
			parse("[N35.6812362,E139.7649361,Z14 東京駅]", {
				hasTitle: false,
			}),
		);
	});
});
