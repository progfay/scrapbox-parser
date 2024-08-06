import { createPlainNode } from "./PlainNode";
import { createNodeParser } from "./creator";
import { convertToNodes } from "./index";

import type { NodeCreator } from "./creator";
import type { NumberListNode, PlainNode } from "./type";

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
			nodes: convertToNodes(text, { ...opts, nested: true }),
		},
	];
};

export const NumberListNodeParser = createNodeParser(createNumberListNode, {
	parseOnNested: false,
	parseOnQuoted: false,
	patterns: [numberListRegExp],
});
