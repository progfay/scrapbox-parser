import type { NodeCreator } from "./creator.ts";
import { createNodeParser } from "./creator.ts";
import type { NodeParser } from "./index.ts";
import type { IconNode } from "./type.ts";

const iconRegExp = /\[[^[\]]*\.icon(?:\*[1-9]\d*)?\]/;

const createIconNode: NodeCreator<IconNode> = ([raw]) => {
	const target = raw.substring(1, raw.length - 1);
	const index = target.lastIndexOf(".icon");
	const path = target.substring(0, index);
	const pathType = path.startsWith("/") ? "root" : "relative";
	const numStr = target.substring(index + 5, target.length);
	const num = numStr.startsWith("*")
		? Number.parseInt(numStr.substring(1), 10)
		: 1;
	return new Array(num)
		.fill({})
		.map(() => ({ path, pathType, type: "icon", raw }));
};

export const IconNodeParser: NodeParser = createNodeParser(createIconNode, {
	parseOnNested: true,
	parseOnQuoted: true,
	patterns: [iconRegExp],
});
