import { generateIconNodeCreator } from "./IconNode.ts";
import { createNodeParser } from "./creator.ts";

const strongIconRegExp = /\[\[[^[\]]*\.icon(?:\*\d+)?\]\]/;

const createStrongIconNode = generateIconNodeCreator("strongIcon");

export const StrongIconNodeParser = createNodeParser(createStrongIconNode, {
	parseOnNested: false,
	parseOnQuoted: true,
	patterns: [strongIconRegExp],
});
