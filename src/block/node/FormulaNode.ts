import { createPlainNode } from "./PlainNode.ts";
import { createNodeParser } from "./creator.ts";

import type { NodeCreator } from "./creator.ts";
import type { FormulaNode, PlainNode } from "./type.ts";

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
