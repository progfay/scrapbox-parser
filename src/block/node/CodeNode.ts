import { createNodeParser } from "./creator";

import type { CodeNode } from "./type";
import type { NodeCreator, NodeParserCreatorOption } from "./creator";

const codeRegExp = /`.*?`/;

const createCodeNode: NodeCreator<CodeNode> = (raw) => ({
  type: "code",
  raw,
  text: raw.substring(1, raw.length - 1),
});

export const codeNodeParserCreatorOption: NodeParserCreatorOption = {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [codeRegExp],
};

export const CodeNodeParser = createNodeParser(
  createCodeNode,
  codeNodeParserCreatorOption
);
