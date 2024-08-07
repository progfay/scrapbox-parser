import { packRows } from "./block/Pack.ts";
import { parseToRows } from "./block/Row.ts";
import { convertToBlock } from "./block/index.ts";

import type { Block } from "./block/index.ts";

/**
 * parser option type
 */
export interface ParserOption {
	/**
	 * is Scrapbox notation text including title
	 */
	hasTitle?: boolean;
}

/**
 * Scrapbox page type
 */
export type Page = Block[];

/**
 * parse Scrapbox notation text into JavaScript Object
 * @param input raw Scrapbox notation text
 * @param opts parser options
 * @returns syntax tree of parsed input
 */
export const parse = (input: string, opts?: ParserOption): Page => {
	const rows = parseToRows(input);
	const packs = packRows(rows, { hasTitle: opts?.hasTitle ?? true });
	return packs.map(convertToBlock);
};

/**
 * get title of Scrapbox page
 * @param input raw Scrapbox notation text
 * @returns title of input Scrapbox page
 */
export const getTitle = (input: string): string => {
	const match = /^\s*\S.*$/m.exec(input);
	return match?.[0]?.trim() ?? "Untitled";
};
