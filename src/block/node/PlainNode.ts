import type { TerminateNodeParser } from "./index.ts";
import type { PlainNode } from "./type.ts";

export const createPlainNode = (raw: string): [PlainNode] => [
	{
		type: "plain",
		raw,
		text: raw,
	},
];

export const PlainNodeParser: TerminateNodeParser = createPlainNode;
