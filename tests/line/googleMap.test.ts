import { describe, expect, it } from "vitest";
import { parse } from "../../src/index.ts";

describe("googleMap", () => {
	it("Simple google map with NE", () => {
		expect(
			parse("[N35.6812362,E139.7649361]", {
				hasTitle: false,
			}),
		).toMatchSnapshot();
	});

	it("Simple google map with SW", () => {
		expect(
			parse("[S13.70533,W69.6533372]", {
				hasTitle: false,
			}),
		).toMatchSnapshot();
	});

	it("Simple google map with zoom", () => {
		expect(
			parse("[N35.6812362,E139.7649361,Z14]", {
				hasTitle: false,
			}),
		).toMatchSnapshot();
	});

	it("Simple google map with place on left", () => {
		expect(
			parse("[東京駅 N35.6812362,E139.7649361,Z14]", {
				hasTitle: false,
			}),
		).toMatchSnapshot();
	});

	it("Simple google map with place on right", () => {
		expect(
			parse("[N35.6812362,E139.7649361,Z14 東京駅]", {
				hasTitle: false,
			}),
		).toMatchSnapshot();
	});
});
