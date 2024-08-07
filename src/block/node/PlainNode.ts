import { createNodeParser } from "./creator.ts";

import type { NodeCreator } from "./creator.ts";
import type { NodeParser } from "./index.ts";
import type { PlainNode } from "./type.ts";

export const createPlainNode: NodeCreator<PlainNode> = (raw) => [
	{
		type: "plain",
		raw,
		text: raw,
	},
];

export const PlainNodeParser: NodeParser = createNodeParser(createPlainNode, {
	parseOnNested: true,
	parseOnQuoted: true,
	patterns: [/^()(.*)()$/],
});
