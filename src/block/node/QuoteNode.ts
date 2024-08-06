import { createPlainNode } from "./PlainNode";
import { createNodeParser } from "./creator";
import { convertToNodes } from "./index";

import type { NodeCreator } from "./creator";
import type { PlainNode, QuoteNode } from "./type";

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
