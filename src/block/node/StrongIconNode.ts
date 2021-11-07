import { createNodeParser } from "./creator";
import { generateIconNodeCreator } from "./IconNode";

import type { NodeParserCreatorOption } from "./creator";

const strongIconRegExp = /\[\[[^[\]]*\.icon(?:\*\d+)?\]\]/;

const createStrongIconNode = generateIconNodeCreator("strongIcon");

const strongIconNodeParserCreatorOption: NodeParserCreatorOption = {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [strongIconRegExp],
};

export const StrongIconNodeParser = createNodeParser(
  createStrongIconNode,
  strongIconNodeParserCreatorOption
);
