import { convertToCodeBlock } from "./CodeBlock";
import { convertToLine } from "./Line";
import { convertToTable } from "./Table";
import { convertToTitle } from "./Title";

import type { CodeBlock } from "./CodeBlock";
import type { Line } from "./Line";
import type { Pack } from "./Pack";
import type { Table } from "./Table";
import type { Title } from "./Title";

/**
 * Scrapbox block type
 */
export type Block = Title | CodeBlock | Table | Line;

export const convertToBlock = (pack: Pack): Block => {
	switch (pack.type) {
		case "title":
			return convertToTitle(pack);

		case "codeBlock":
			return convertToCodeBlock(pack);

		case "table":
			return convertToTable(pack);

		case "line":
			return convertToLine(pack);
	}
};
