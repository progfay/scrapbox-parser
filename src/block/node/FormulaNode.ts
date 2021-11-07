import { createNodeParser } from "./creator";

import type { FormulaNode } from "./type";
import type { NodeCreator, NodeParserCreatorOption } from "./creator";

const formulaWithTailHalfSpaceRegExp = /\[\$ .+? \]/;
const formulaRegExp = /\[\$ [^\]]+\]/;

const createFormulaNode: NodeCreator<FormulaNode> = (raw) => ({
  type: "formula",
  raw,
  formula: raw.substring(3, raw.length - (raw.endsWith(" ]") ? 2 : 1)),
});

export const formulaNodeParserCreatorOption: NodeParserCreatorOption = {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [formulaWithTailHalfSpaceRegExp, formulaRegExp],
};

export const FormulaNodeParser = createNodeParser(
  createFormulaNode,
  formulaNodeParserCreatorOption
);
