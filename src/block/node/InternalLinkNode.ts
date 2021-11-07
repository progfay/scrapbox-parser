import { createNodeParser } from "./creator";

import type { LinkNode } from "./type";
import type { NodeCreator, NodeParserCreatorOption } from "./creator";

const internalLinkRegExp = /\[\/?[^[\]]+\]/;

const createInternalLinkNode: NodeCreator<LinkNode> = (raw) => {
  const href = raw.substring(1, raw.length - 1);
  return {
    type: "link",
    raw,
    pathType: href.startsWith("/") ? "root" : "relative",
    href,
    content: "",
  };
};

export const internalLinkNodeParserCreatorOption: NodeParserCreatorOption = {
  parseOnNested: true,
  parseOnQuoted: true,
  patterns: [internalLinkRegExp],
};

export const InternalLinkNodeParser = createNodeParser(
  createInternalLinkNode,
  internalLinkNodeParserCreatorOption
);
