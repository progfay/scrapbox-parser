import { convertToNodes } from "./node/index.ts";
import type { Node } from "./node/type.ts";
import type { Row } from "./Row.ts";

export interface TablePack {
	type: "table";
	rows: [Row, ...Row[]];
}

/**
 * Scrapbox {@link https://scrapbox.io/help/Syntax#58795996651ee5000012d4c7 | table} type
 */
export interface Table {
	indent: number;
	type: "table";
	fileName: string;
	cells: Node[][][];
}

export const convertToTable = (pack: TablePack): Table => {
	const {
		rows: [{ indent, text }, ...body],
	} = pack;
	const fileName = text.replace(/^\s*table:/, "");

	return {
		indent,
		type: "table",
		fileName,
		cells: body
			.map((row: Row): string => row.text.substring(indent + 1))
			.map((text: string): Node[][] =>
				text.split("\t").map((block: string): Node[] =>
					convertToNodes(block, {
						nested: false,
						quoted: false,
						context: "table",
					}),
				),
			),
	};
};
