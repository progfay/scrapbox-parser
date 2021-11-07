import { createNodeParser } from "./creator";

import type { HelpfeelNode } from "./type";
import type { NodeCreator, NodeParserCreatorOption } from "./creator";

const helpfeelRegExp = /^\? .+$/;

const createHelpfeelNode: NodeCreator<HelpfeelNode> = (raw) => ({
  type: "helpfeel",
  raw,
  text: raw.substring(2),
});

export const helpfeelNodeParserCreatorOption: NodeParserCreatorOption = {
  parseOnNested: false,
  parseOnQuoted: false,
  patterns: [helpfeelRegExp],
};

export const HelpfeelNodeParser = createNodeParser(
  createHelpfeelNode,
  helpfeelNodeParserCreatorOption
);
