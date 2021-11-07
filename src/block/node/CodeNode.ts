import { createNodeParser } from "./creator";
import { createPlainNode } from "./PlainNode";

import type { CodeNode, PlainNode } from "./type";
import type { NodeCreator } from "./creator";

const codeRegExp = /`.*?`/;

const createCodeNode: NodeCreator<CodeNode | PlainNode> = (raw, opts) =>
  opts.context === "table"
    ? createPlainNode(raw, opts)
    : [
        {
          type: "code",
          raw,
          text: raw.substring(1, raw.length - 1),
        },
      ];

export const CodeNodeParser = createNodeParser(createCodeNode, {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [codeRegExp],
});
