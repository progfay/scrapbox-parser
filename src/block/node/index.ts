import { BlankNodeParser } from "./BlankNode";
import { CodeNodeParser } from "./CodeNode";
import { CommandLineNodeParser } from "./CommandLineNode";
import { DecorationNodeParser } from "./DecorationNode";
import { ExternalLinkNodeParser } from "./ExternalLinkNode";
import { FormulaNodeParser } from "./FormulaNode";
import { GoogleMapNodeParser } from "./GoogleMapNode";
import { HashTagNodeParser } from "./HashTagNode";
import { HelpfeelNodeParser } from "./HelpfeelNode";
import { IconNodeParser } from "./IconNode";
import { ImageNodeParser } from "./ImageNode";
import { InternalLinkNodeParser } from "./InternalLinkNode";
import { NumberListNodeParser } from "./NumberListNode";
import { PlainNodeParser } from "./PlainNode";
import { QuoteNodeParser } from "./QuoteNode";
import { StrongIconNodeParser } from "./StrongIconNode";
import { StrongImageNodeParser } from "./StrongImageNode";
import { StrongNodeParser } from "./StrongNode";

import type { Node } from "./type";

export interface NodeParserOption {
	nested: boolean;
	quoted: boolean;
	context: "line" | "table";
}
export type NextNodeParser = () => Node[];
export type NodeParser = (
	text: string,
	opts: NodeParserOption,
	next?: NextNodeParser,
) => Node[];

const FalsyEliminator: NodeParser = (text, _, next) => {
	if (text === "") return [];
	return next?.() ?? [];
};

const combineNodeParsers =
	(...parsers: NodeParser[]) =>
	(text: string, opts: NodeParserOption): Node[] =>
		parsers.reduceRight(
			(acc: NextNodeParser, parser: NodeParser): NextNodeParser =>
				() =>
					parser(text, opts, acc),
			() => PlainNodeParser(text, opts),
		)();

export const convertToNodes: ReturnType<typeof combineNodeParsers> =
	combineNodeParsers(
		FalsyEliminator,
		QuoteNodeParser,
		HelpfeelNodeParser,
		CodeNodeParser,
		CommandLineNodeParser,
		FormulaNodeParser,
		BlankNodeParser,
		DecorationNodeParser,
		StrongImageNodeParser,
		StrongIconNodeParser,
		StrongNodeParser,
		ImageNodeParser,
		ExternalLinkNodeParser,
		IconNodeParser,
		GoogleMapNodeParser,
		InternalLinkNodeParser,
		HashTagNodeParser,
		NumberListNodeParser,
	);
