import { convertToNodes } from ".";
import { createNodeParser } from "./creator";
import { createPlainNode } from "./PlainNode";

import type { PlainNode, QuoteNode } from "./type";
import type { NodeCreator } from "./creator";

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
