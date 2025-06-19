import type { NodeCreator } from "./creator.ts";
import { createNodeParser } from "./creator.ts";
import { convertToNodes, type NodeParser } from "./index.ts";
import { createPlainNode } from "./PlainNode.ts";
import type { NumberListNode, PlainNode } from "./type.ts";

const numberListRegExp = /^[0-9]+\. .*$/;

const createNumberListNode: NodeCreator<NumberListNode | PlainNode> = (
	raw,
	opts,
) => {
	if (opts.context === "table") {
		return createPlainNode(raw, opts);
	}

	const separatorIndex = raw.indexOf(" ");
	const rawNumber = raw.substring(0, separatorIndex - 1);
	const number = Number.parseInt(rawNumber, 10);
	const text = raw.substring(separatorIndex + 1, raw.length);
	return [
		{
			type: "numberList",
			raw,
			rawNumber,
			number,
			nodes: convertToNodes(text, { ...opts, nested: false }),
		},
	];
};

export const NumberListNodeParser: NodeParser = createNodeParser(
	createNumberListNode,
	{
		parseOnNested: false,
		parseOnQuoted: false,
		patterns: [numberListRegExp],
	},
);
