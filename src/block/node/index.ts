import { QuoteNodeParser } from './QuoteNode'
import { HelpfeelNodeParser } from './HelpfeelNode'
import { StrongImageNodeParser } from './StrongImageNode'
import { StrongIconNodeParser } from './StrongIconNode'
import { StrongNodeParser } from './StrongNode'
import { FormulaNodeParser } from './FormulaNode'
import { DecorationNodeParser } from './DecorationNode'
import { CodeNodeParser } from './CodeNode'
import { CommandLineNodeParser } from './CommandLineNode'
import { BlankNodeParser } from './BlankNode'
import { ImageNodeParser } from './ImageNode'
import { ExternalLinkNodeParser } from './ExternalLinkNode'
import { GoogleMapNodeParser } from './GoogleMapNode'
import { InternalLinkNodeParser } from './InternalLinkNode'
import { IconNodeParser } from './IconNode'
import { HashTagNodeParser } from './HashTagNode'
import { PlainNodeParser } from './PlainNode'

import type { LineNode } from './type'

export interface NodeParserOption {
  nested: boolean
  quoted: boolean
}
export type NextNodeParser = () => LineNode[]
export type NodeParser = (text: string, opts: NodeParserOption, next?: NextNodeParser) => LineNode[]

const FalsyEliminator: NodeParser = (text, _, next) => {
  if (text === '') return []
  return next?.() ?? []
}

const combineNodeParsers = (...parsers: NodeParser[]) => (
  text: string = '',
  opts: NodeParserOption = { nested: false, quoted: false }
): LineNode[] =>
  parsers.reduceRight(
    (acc: NextNodeParser, parser: NodeParser): NextNodeParser => () => parser(text, opts, acc),
    () => PlainNodeParser(text, opts)
  )()

export const convertToLineNodes = combineNodeParsers(
  FalsyEliminator,
  QuoteNodeParser,
  HelpfeelNodeParser,
  CodeNodeParser,
  CommandLineNodeParser,
  FormulaNodeParser,
  BlankNodeParser,
  StrongImageNodeParser,
  StrongIconNodeParser,
  StrongNodeParser,
  DecorationNodeParser,
  ImageNodeParser,
  ExternalLinkNodeParser,
  IconNodeParser,
  GoogleMapNodeParser,
  InternalLinkNodeParser,
  HashTagNodeParser
)
