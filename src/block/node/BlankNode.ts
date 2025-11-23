import type { NodeCreator } from "./creator.ts";
import { createNodeParser } from "./creator.ts";
import type { NodeParser } from "./index.ts";
import { createPlainNode } from "./PlainNode.ts";
import type { BlankNode, PlainNode } from "./type.ts";

const blankRegExp = /\[\s+\]/;

const createBlankNode: NodeCreator<BlankNode | PlainNode> = ([raw], opts) =>
	opts.context === "table"
		? createPlainNode(raw)
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
