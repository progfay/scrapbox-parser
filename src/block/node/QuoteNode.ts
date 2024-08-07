import { createPlainNode } from "./PlainNode.ts";
import { createNodeParser } from "./creator.ts";
import { convertToNodes } from "./index.ts";

import type { NodeCreator } from "./creator.ts";
import type { PlainNode, QuoteNode } from "./type.ts";

const quoteRegExp = /^>.*$/;

const createQuoteNode: NodeCreator<QuoteNode | PlainNode> = (raw, opts) =>
	opts.context === "table"
		? createPlainNode(raw, opts)
		: [
				{
					type: "quote",
					raw,
					nodes: convertToNodes(raw.substring(1), { ...opts, quoted: true }),
				},
			];

export const QuoteNodeParser = createNodeParser(createQuoteNode, {
	parseOnNested: false,
	parseOnQuoted: false,
	patterns: [quoteRegExp],
});
