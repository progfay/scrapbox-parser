import { createNodeParser } from "./creator";
import { createPlainNode } from "./PlainNode";

import type { HelpfeelNode, PlainNode } from "./type";
import type { NodeCreator } from "./creator";

const helpfeelRegExp = /^\? .+$/;

const createHelpfeelNode: NodeCreator<HelpfeelNode | PlainNode> = (
  raw,
  opts,
) =>
  opts.context === "table"
    ? createPlainNode(raw, opts)
    : [
        {
          type: "helpfeel",
          raw,
          text: raw.substring(2),
        },
      ];

export const HelpfeelNodeParser = createNodeParser(createHelpfeelNode, {
  parseOnNested: false,
  parseOnQuoted: false,
  patterns: [helpfeelRegExp],
});
