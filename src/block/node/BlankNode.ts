import { createNodeParser } from "./creator";
import { createPlainNode } from "./PlainNode";

import type { BlankNode, PlainNode } from "./type";
import type { NodeCreator } from "./creator";

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

export const BlankNodeParser = createNodeParser(createBlankNode, {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [blankRegExp],
});
