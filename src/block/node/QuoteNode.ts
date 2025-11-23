import type { NodeCreator } from "./creator.ts";
import { createNodeParser } from "./creator.ts";
import { convertToNodes, type NodeParser } from "./index.ts";
import { createPlainNode } from "./PlainNode.ts";
import type { PlainNode, QuoteNode } from "./type.ts";

const quoteRegExp = /^>.*$/;

const createQuoteNode: NodeCreator<QuoteNode | PlainNode> = ([raw], opts) =>
	opts.context === "table"
		? createPlainNode(raw)
		: [
				{
					type: "quote",
					raw,
					nodes: convertToNodes(raw.substring(1), { ...opts, quoted: true }),
				},
			];

export const QuoteNodeParser: NodeParser = createNodeParser(createQuoteNode, {
	parseOnNested: false,
	parseOnQuoted: false,
	patterns: [quoteRegExp],
});
