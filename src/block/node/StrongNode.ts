import { createPlainNode } from "./PlainNode";
import { createNodeParser } from "./creator";
import { convertToNodes } from "./index";

import type { NodeCreator } from "./creator";
import type { NodeParser } from "./index";
import type { PlainNode, StrongNode } from "./type";

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
