import { convertToNodes } from "./index";
import { createNodeParser } from "./creator";
import { createPlainNode } from "./PlainNode";

import type { NodeParser } from "./index";
import type { PlainNode, StrongNode } from "./type";
import type { NodeCreator } from "./creator";

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
