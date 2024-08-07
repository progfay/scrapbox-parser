import "node:test";

declare module "node:test" {
	interface TestContext {
		readonly assert: {
			equal(actual: unknown, expected: unknown, message?: string | Error): void;
			strictEqual(
				actual: unknown,
				expected: unknown,
				message?: string | Error,
			): void;
			deepStrictEqual(
				actual: unknown,
				expected: unknown,
				message?: string | Error,
			): void;
			snapshot(v: unknown): void;
		};
	}
}
