import { QuoteNodeParser } from "./QuoteNode";
import { HelpfeelNodeParser } from "./HelpfeelNode";
import { StrongImageNodeParser } from "./StrongImageNode";
import { StrongIconNodeParser } from "./StrongIconNode";
import { StrongNodeParser } from "./StrongNode";
import { FormulaNodeParser } from "./FormulaNode";
import { DecorationNodeParser } from "./DecorationNode";
import { CodeNodeParser } from "./CodeNode";
import { CommandLineNodeParser } from "./CommandLineNode";
import { BlankNodeParser } from "./BlankNode";
import { ImageNodeParser } from "./ImageNode";
import { ExternalLinkNodeParser } from "./ExternalLinkNode";
import { GoogleMapNodeParser } from "./GoogleMapNode";
import { InternalLinkNodeParser } from "./InternalLinkNode";
import { IconNodeParser } from "./IconNode";
import { HashTagNodeParser } from "./HashTagNode";
import { PlainNodeParser } from "./PlainNode";

import type { Node } from "./type";

export interface NodeParserOption {
  nested: boolean;
  quoted: boolean;
}
export type NextNodeParser = () => Node[];
export type NodeParser = (
  text: string,
  opts: NodeParserOption,
  next?: NextNodeParser
) => Node[];

const FalsyEliminator: NodeParser = (text, _, next) => {
  if (text === "") return [];
  return next?.() ?? [];
};

const combineNodeParsers =
  (...parsers: NodeParser[]) =>
  (
    text = "",
    opts: NodeParserOption = { nested: false, quoted: false }
  ): Node[] =>
    parsers.reduceRight(
      (acc: NextNodeParser, parser: NodeParser): NextNodeParser =>
        () =>
          parser(text, opts, acc),
      () => PlainNodeParser(text, opts)
    )();

export const convertToNodes = combineNodeParsers(
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
  HashTagNodeParser
);
