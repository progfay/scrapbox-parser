import { createNodeParser } from "./creator.ts";

import type { NodeCreator } from "./creator.ts";
import type { LinkNode } from "./type.ts";

const internalLinkRegExp = /\[\/?[^[\]]+\]/;

const createInternalLinkNode: NodeCreator<LinkNode> = (raw) => {
	const href = raw.substring(1, raw.length - 1);
	return [
		{
			type: "link",
			raw,
			pathType: href.startsWith("/") ? "root" : "relative",
			href,
			content: "",
		},
	];
};

export const InternalLinkNodeParser = createNodeParser(createInternalLinkNode, {
	parseOnNested: true,
	parseOnQuoted: true,
	patterns: [internalLinkRegExp],
});
