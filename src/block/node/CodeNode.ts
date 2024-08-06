import { createPlainNode } from "./PlainNode";
import { createNodeParser } from "./creator";

import type { NodeCreator } from "./creator";
import type { NodeParser } from "./index";
import type { CodeNode, PlainNode } from "./type";

const codeRegExp = /`.*?`/;

const createCodeNode: NodeCreator<CodeNode | PlainNode> = (raw, opts) =>
	opts.context === "table"
		? createPlainNode(raw, opts)
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
