import { createPlainNode } from "./PlainNode.ts";
import { createNodeParser } from "./creator.ts";

import type { NodeCreator } from "./creator.ts";
import type { PlainNode, StrongImageNode } from "./type.ts";

const strongImageRegExp = /\[\[https?:\/\/[^\s\]]+\.(?:png|jpe?g|gif|svg|webp)\]\]/i;
const strongGyazoImageRegExp =
	/\[\[https?:\/\/(?:[0-9a-z-]+\.)?gyazo\.com\/[0-9a-f]{32}\]\]/;

const createStrongImageNode: NodeCreator<StrongImageNode | PlainNode> = (
	raw,
	opts,
) => {
	if (opts.context === "table") {
		return createPlainNode(raw, opts);
	}

	const src = raw.substring(2, raw.length - 2);
	const isGyazoImage =
		/^https?:\/\/([0-9a-z-]\.)?gyazo\.com\/[0-9a-f]{32}$/.test(src);
	return [
		{
			type: "strongImage",
			raw,
			src: isGyazoImage ? `${src}/thumb/1000` : src,
		},
	];
};

export const StrongImageNodeParser = createNodeParser(createStrongImageNode, {
	parseOnNested: false,
	parseOnQuoted: true,
	patterns: [strongImageRegExp, strongGyazoImageRegExp],
});
