import { createPlainNode } from "./PlainNode";
import { createNodeParser } from "./creator";

import type { NodeCreator } from "./creator";
import type { FormulaNode, PlainNode } from "./type";

const formulaWithTailHalfSpaceRegExp = /\[\$ .+? \]/;
const formulaRegExp = /\[\$ [^\]]+\]/;

const createFormulaNode: NodeCreator<FormulaNode | PlainNode> = (raw, opts) =>
	opts.context === "table"
		? createPlainNode(raw, opts)
		: [
				{
					type: "formula",
					raw,
					formula: raw.substring(3, raw.length - (raw.endsWith(" ]") ? 2 : 1)),
				},
			];

export const FormulaNodeParser = createNodeParser(createFormulaNode, {
	parseOnNested: false,
	parseOnQuoted: true,
	patterns: [formulaWithTailHalfSpaceRegExp, formulaRegExp],
});
