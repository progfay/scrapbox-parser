import type { Row } from "./Row";

export interface CodeBlockPack {
	type: "codeBlock";
	rows: Row[];
}

/**
 * Scrapbox {@link https://scrapbox.io/help/Syntax#58348ae2651ee500008d67df | code block} type
 */
export interface CodeBlock {
	indent: number;
	type: "codeBlock";
	fileName: string;
	content: string;
}

export const convertToCodeBlock = (pack: CodeBlockPack): CodeBlock => {
	const {
		rows: [head, ...body],
	} = pack;
	const { indent = 0, text = "" } = head ?? {};
	const fileName: string = text.replace(/^\s*code:/, "");

	return {
		indent,
		type: "codeBlock",
		fileName,
		content: body
			.map((row: Row): string => row.text.substring(indent + 1))
			.join("\n"),
	};
};
