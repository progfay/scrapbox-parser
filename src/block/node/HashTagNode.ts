import { createPlainNode } from "./PlainNode.ts";
import { createNodeParser } from "./creator.ts";

import type { NodeCreator } from "./creator.ts";
import type { NodeParser } from "./index.ts";
import type { HashTagNode, PlainNode } from "./type.ts";

const hashTagRegExp = /(?:^|\s)#\S+/;

const createHashTagNode: NodeCreator<HashTagNode | PlainNode> = (raw, opts) => {
	if (opts.context === "table") {
		return createPlainNode(raw, opts);
	}

	if (raw.startsWith("#")) {
		return [
			{
				type: "hashTag",
				raw,
				href: raw.substring(1),
			},
		];
	}

	const space = raw.substring(0, 1);
	const tag = raw.substring(1);

	return [
		...createPlainNode(space, opts),
		{
			type: "hashTag",
			raw: tag,
			href: tag.substring(1),
		},
	];
};

export const HashTagNodeParser: NodeParser = createNodeParser(
	createHashTagNode,
	{
		parseOnNested: true,
		parseOnQuoted: true,
		patterns: [hashTagRegExp],
	},
);
