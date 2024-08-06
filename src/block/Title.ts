import type { Row } from "./Row";

export interface TitlePack {
	type: "title";
	rows: [Row];
}

/**
 * Scrapbox title type
 */
export interface Title {
	type: "title";
	text: string;
}

export const convertToTitle = (pack: TitlePack): Title => {
	return {
		type: "title",
		text: pack.rows[0].text,
	};
};
