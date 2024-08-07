import { createPlainNode } from "./PlainNode.ts";
import { type NodeCreator, createNodeParser } from "./creator.ts";
import type { PlainNode, StrongIconNode } from "./type.ts";

const strongIconRegExp = /\[\[[^[\]]*\.icon(?:\*\d+)?\]\]/;

const createStrongIconNode: NodeCreator<StrongIconNode | PlainNode> = (
	raw,
	opts,
) => {
	if (opts.context === "table") return createPlainNode(raw, opts);

	const target = raw.substring(2, raw.length - 2);
	const index = target.lastIndexOf(".icon");
	const path = target.substring(0, index);
	const pathType = path.startsWith("/") ? "root" : "relative";
	const numStr = target.substring(index + 5, target.length);
	const num = numStr.startsWith("*")
		? Number.parseInt(numStr.substring(1), 10)
		: 1;
	return new Array(num)
		.fill({})
		.map(() => ({ path, pathType, type: "strongIcon", raw }));
};

export const StrongIconNodeParser = createNodeParser(createStrongIconNode, {
	parseOnNested: false,
	parseOnQuoted: true,
	patterns: [strongIconRegExp],
});
