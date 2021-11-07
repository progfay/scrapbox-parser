import { convertToNodes } from ".";
import { createNodeParser } from "./creator";

import type { QuoteNode } from "./type";
import type { NodeCreator, NodeParserCreatorOption } from "./creator";

const quoteRegExp = /^>.*$/;

const createQuoteNode: NodeCreator<QuoteNode> = (raw, opts) => ({
  type: "quote",
  raw,
  nodes: convertToNodes(raw.substring(1), { ...opts, quoted: true }),
});

export const quoteNodeParserCreatorOption: NodeParserCreatorOption = {
  parseOnNested: false,
  parseOnQuoted: false,
  patterns: [quoteRegExp],
};

export const QuoteNodeParser = createNodeParser(
  createQuoteNode,
  quoteNodeParserCreatorOption
);
