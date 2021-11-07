import { createNodeParser } from "./creator";

import type { PlainNode } from "./type";
import type { NodeCreator, NodeParserCreatorOption } from "./creator";

export const createPlainNode: NodeCreator<PlainNode> = (raw) => ({
  type: "plain",
  raw,
  text: raw,
});

export const plainNodeParserCreatorOption: NodeParserCreatorOption = {
  parseOnNested: true,
  parseOnQuoted: true,
  patterns: [/^()(.*)()$/],
};

export const PlainNodeParser = createNodeParser(
  createPlainNode,
  plainNodeParserCreatorOption
);
