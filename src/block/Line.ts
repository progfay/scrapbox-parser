import { convertToNodes } from "./node/index.ts";
import type { Node } from "./node/type.ts";
import type { Row } from "./Row.ts";

export interface LinePack {
	type: "line";
	rows: [Row];
}

/**
 * Scrapbox line type
 */
export interface Line {
	indent: number;
	type: "line";
	nodes: Node[];
}

export const convertToLine = (pack: LinePack): Line => {
	const { indent, text } = pack.rows[0];
	return {
		indent,
		type: "line",
		nodes: convertToNodes(text.substring(indent), {
			nested: false,
			quoted: false,
			context: "line",
		}),
	};
};
