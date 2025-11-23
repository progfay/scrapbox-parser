import type { NodeCreator } from "./creator.ts";
import type { TerminateNodeParser } from "./index.ts";
import type { PlainNode } from "./type.ts";

export const createPlainNode: NodeCreator<PlainNode> = (raw) => [
	{
		type: "plain",
		raw,
		text: raw,
	},
];

export const PlainNodeParser: TerminateNodeParser = createPlainNode;
