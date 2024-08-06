import { generateIconNodeCreator } from "./IconNode";
import { createNodeParser } from "./creator";

const strongIconRegExp = /\[\[[^[\]]*\.icon(?:\*\d+)?\]\]/;

const createStrongIconNode = generateIconNodeCreator("strongIcon");

export const StrongIconNodeParser = createNodeParser(createStrongIconNode, {
	parseOnNested: false,
	parseOnQuoted: true,
	patterns: [strongIconRegExp],
});
