import { createNodeParser } from "./creator";

import type { BlankNode } from "./type";
import type { NodeCreator, NodeParserCreatorOption } from "./creator";

const blankRegExp = /\[\s+\]/;

const createBlankNode: NodeCreator<BlankNode> = (raw: string) => ({
  type: "blank",
  raw,
  text: raw.substring(1, raw.length - 1),
});

export const blankNodeParserCreatorOption: NodeParserCreatorOption = {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [blankRegExp],
};

export const BlankNodeParser = createNodeParser(
  createBlankNode,
  blankNodeParserCreatorOption
);
