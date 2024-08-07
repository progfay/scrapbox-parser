import { createPlainNode } from "./PlainNode.ts";
import { createNodeParser } from "./creator.ts";
import { convertToNodes } from "./index.ts";

import type { NodeCreator } from "./creator.ts";
import type { NodeParser } from "./index.ts";
import type { PlainNode, StrongNode } from "./type.ts";

const strongRegExp = /\[\[(?:[^[]|\[[^[]).*?\]*\]\]/;

const createStrongNode: NodeCreator<StrongNode | PlainNode> = (raw, opts) =>
	opts.context === "table"
		? createPlainNode(raw, opts)
		: [
				{
					type: "strong",
					raw,
					nodes: convertToNodes(raw.substring(2, raw.length - 2), {
						...opts,
						nested: true,
					}),
				},
			];

export const StrongNodeParser: NodeParser = createNodeParser(createStrongNode, {
	parseOnNested: false,
	parseOnQuoted: true,
	patterns: [strongRegExp],
});
