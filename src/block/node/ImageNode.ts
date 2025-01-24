import { createPlainNode } from "./PlainNode.ts";
import { createNodeParser } from "./creator.ts";

import type { NodeCreator } from "./creator.ts";
import type { NodeParser } from "./index.ts";
import type { ImageNode, PlainNode } from "./type.ts";

const srcFirstStrongImageRegExp =
	/\[https?:\/\/[^\s\]]+\.(?:png|jpe?g|gif|svg|webp)(?:\?[^\]\s]+)?(?:\s+https?:\/\/[^\s\]]+)?\]/i;
const linkFirstStrongImageRegExp =
	/\[https?:\/\/[^\s\]]+\s+https?:\/\/[^\s\]]+\.(?:png|jpe?g|gif|svg|webp)(?:\?[^\]\s]+)?\]/i;
const srcFirstStrongGyazoImageRegExp =
	/\[https?:\/\/(?:[0-9a-z-]+\.)?gyazo\.com\/[0-9a-f]{32}(?:\/raw)?(?:\s+https?:\/\/[^\s\]]+)?\]/;
const linkFirstStrongGyazoImageRegExp =
	/\[https?:\/\/[^\s\]]+\s+https?:\/\/(?:[0-9a-z-]+\.)?gyazo\.com\/[0-9a-f]{32}(?:\/raw)?\]/;

const isImageUrl = (text: string): boolean =>
	/^https?:\/\/[^\s\]]+\.(png|jpe?g|gif|svg|webp)(\?[^\]\s]+)?$/i.test(text) ||
	isGyazoImageUrl(text);

const isGyazoImageUrl = (text: string): boolean =>
	/^https?:\/\/([0-9a-z-]\.)?gyazo\.com\/[0-9a-f]{32}(\/raw)?$/.test(text);

const createImageNode: NodeCreator<ImageNode | PlainNode> = (raw, opts) => {
	if (opts.context === "table") {
		return createPlainNode(raw, opts);
	}

	const index = raw.search(/\s/);
	const first =
		index !== -1 ? raw.substring(1, index) : raw.substring(1, raw.length - 1);
	const second =
		index !== -1
			? raw.substring(index, raw.length - 1).replace(/^\s+/, "")
			: "";
	const [src, link] = isImageUrl(second) ? [second, first] : [first, second];

	return [
		{
			type: "image",
			raw,
			src: /^https?:\/\/([0-9a-z-]\.)?gyazo\.com\/[0-9a-f]{32}$/.test(src)
				? `${src}/thumb/1000`
				: src,
			link,
		},
	];
};

export const ImageNodeParser: NodeParser = createNodeParser(createImageNode, {
	parseOnNested: true,
	parseOnQuoted: true,
	patterns: [
		srcFirstStrongImageRegExp,
		linkFirstStrongImageRegExp,
		srcFirstStrongGyazoImageRegExp,
		linkFirstStrongGyazoImageRegExp,
	],
});
