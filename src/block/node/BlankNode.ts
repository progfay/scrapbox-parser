import { createPlainNode } from "./PlainNode";
import { createNodeParser } from "./creator";

import type { NodeCreator } from "./creator";
import type { NodeParser } from "./index";
import type { BlankNode, PlainNode } from "./type";

const blankRegExp = /\[\s+\]/;

const createBlankNode: NodeCreator<BlankNode | PlainNode> = (raw, opts) =>
	opts.context === "table"
		? createPlainNode(raw, opts)
		: [
				{
					type: "blank",
					raw,
					text: raw.substring(1, raw.length - 1),
				},
			];

export const BlankNodeParser: NodeParser = createNodeParser(createBlankNode, {
	parseOnNested: false,
	parseOnQuoted: true,
	patterns: [blankRegExp],
});
