import { BlankNodeParser } from "./BlankNode.ts";
import { CodeNodeParser } from "./CodeNode.ts";
import { CommandLineNodeParser } from "./CommandLineNode.ts";
import { DecorationNodeParser } from "./DecorationNode.ts";
import { ExternalLinkNodeParser } from "./ExternalLinkNode.ts";
import { FormulaNodeParser } from "./FormulaNode.ts";
import { GoogleMapNodeParser } from "./GoogleMapNode.ts";
import { HashTagNodeParser } from "./HashTagNode.ts";
import { HelpfeelNodeParser } from "./HelpfeelNode.ts";
import { IconNodeParser } from "./IconNode.ts";
import { ImageNodeParser } from "./ImageNode.ts";
import { InternalLinkNodeParser } from "./InternalLinkNode.ts";
import { NumberListNodeParser } from "./NumberListNode.ts";
import { PlainNodeParser } from "./PlainNode.ts";
import { QuoteNodeParser } from "./QuoteNode.ts";
import { StrongIconNodeParser } from "./StrongIconNode.ts";
import { StrongImageNodeParser } from "./StrongImageNode.ts";
import { StrongNodeParser } from "./StrongNode.ts";

import type { Node } from "./type.ts";

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
		NumberListNodeParser,
		CodeNodeParser,
		CommandLineNodeParser,
		BlankNodeParser,
		DecorationNodeParser,
		FormulaNodeParser,
		StrongImageNodeParser,
		StrongIconNodeParser,
		StrongNodeParser,
		ImageNodeParser,
		ExternalLinkNodeParser,
		IconNodeParser,
		GoogleMapNodeParser,
		InternalLinkNodeParser,
		HashTagNodeParser,
	);
