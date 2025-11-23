import type { NodeCreator } from "./creator.ts";
import { createNodeParser } from "./creator.ts";
import type { NodeParser } from "./index.ts";
import { createPlainNode } from "./PlainNode.ts";
import type { CodeNode, PlainNode } from "./type.ts";

const codeRegExp = /`.*?`/;

const createCodeNode: NodeCreator<CodeNode | PlainNode> = ([raw], opts) =>
	opts.context === "table"
		? createPlainNode(raw)
		: [
				{
					type: "code",
					raw,
					text: raw.substring(1, raw.length - 1),
				},
			];

export const CodeNodeParser: NodeParser = createNodeParser(createCodeNode, {
	parseOnNested: false,
	parseOnQuoted: true,
	patterns: [codeRegExp],
});
