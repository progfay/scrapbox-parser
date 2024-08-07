import type { ParserOption } from "../parse.ts";
import type { CodeBlockPack } from "./CodeBlock.ts";
import type { LinePack } from "./Line.ts";
import type { Row } from "./Row.ts";
import type { TablePack } from "./Table.ts";
import type { TitlePack } from "./Title.ts";

export type Pack = TitlePack | CodeBlockPack | TablePack | LinePack;

const isChildRowOfPack = (pack: Pack, row: Row): boolean =>
	(pack.type === "codeBlock" || pack.type === "table") &&
	row.indent > (pack.rows[0]?.indent ?? 0);

const packing = (packs: Pack[], row: Row): Pack[] => {
	const lastPack = packs[packs.length - 1];
	if (lastPack !== undefined && isChildRowOfPack(lastPack, row)) {
		lastPack.rows.push(row);
		return packs;
	}

	packs.push({
		type: /^\s*code:/.test(row.text)
			? "codeBlock"
			: /^\s*table:/.test(row.text)
				? "table"
				: "line",
		rows: [row],
	});

	return packs;
};

export const packRows = (rows: Row[], opts: ParserOption): Pack[] => {
	if (opts.hasTitle ?? true) {
		const [title, ...body] = rows;
		if (title === undefined) return [];
		return [
			{
				type: "title",
				rows: [title],
			},
			...body.reduce(packing, []),
		];
	}

	return rows.reduce(packing, []);
};
