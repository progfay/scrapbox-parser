import { QuoteNodeParser } from './QuoteNode'
import { HelpfeelNodeParser } from './HelpfeelNode'
import { StrongImageNodeParser } from './StrongImageNode'
import { StrongIconNodeParser } from './StrongIconNode'
import { StrongNodeParser } from './StrongNode'
import { FormulaNodeParser } from './FormulaNode'
import { DecorationNodeParser } from './DecorationNode'
import { CodeNodeParser } from './CodeNode'
import { BlankNodeParser } from './BlankNode'
import { UrlNodeParser } from './UrlNode'
import { GoogleMapNodeParser } from './GoogleMapNode'
import { InternalLinkNodeParser } from './InternalLinkNode'
import { IconNodeParser } from './IconNode'
import { HashTagNodeParser } from './HashTagNode'
import { PlainNodeParser } from './PlainNode'

import type { QuoteNode } from './QuoteNode'
import type { HelpfeelNode } from './HelpfeelNode'
import type { StrongImageNode } from './StrongImageNode'
import type { StrongIconNode } from './StrongIconNode'
import type { StrongNode } from './StrongNode'
import type { FormulaNode } from './FormulaNode'
import type { DecorationNode } from './DecorationNode'
import type { CodeNode } from './CodeNode'
import type { BlankNode } from './BlankNode'
import type { UrlNode } from './UrlNode'
import type { GoogleMapNode } from './GoogleMapNode'
import type { InternalLinkNode } from './InternalLinkNode'
import type { IconNode } from './IconNode'
import type { HashTagNode } from './HashTagNode'
import type { PlainNode } from './PlainNode'

export type LineNode =
  | QuoteNode
  | HelpfeelNode
  | StrongImageNode
  | StrongIconNode
  | StrongNode
  | FormulaNode
  | DecorationNode
  | CodeNode
  | BlankNode
  | UrlNode
  | GoogleMapNode
  | InternalLinkNode
  | IconNode
  | HashTagNode
  | PlainNode

export interface NodeParserOption {
  nested: boolean
  quoted: boolean
}
export type NextNodeParser = () => LineNode[]
export type NodeParser = (
  text: string,
  opt: NodeParserOption,
  next: NextNodeParser
) => LineNode[]

const FalsyEliminator: NodeParser = (text, _opt, next) => {
  if (text === '') return []
  return next()
}

const combineNodeParsers = (...parsers: NodeParser[]) => (
  text: string = '',
  opt: NodeParserOption = { nested: false, quoted: false }
): LineNode[] =>
  parsers.reduceRight(
    (acc: NextNodeParser, parser: NodeParser): NextNodeParser => () =>
      parser(text, opt, acc),
    () => PlainNodeParser(text)
  )()

export const convertToLineNodes = combineNodeParsers(
  FalsyEliminator,
  QuoteNodeParser,
  HelpfeelNodeParser,
  CodeNodeParser,
  FormulaNodeParser,
  BlankNodeParser,
  StrongImageNodeParser,
  StrongIconNodeParser,
  StrongNodeParser,
  DecorationNodeParser,
  UrlNodeParser,
  IconNodeParser,
  GoogleMapNodeParser,
  InternalLinkNodeParser,
  HashTagNodeParser
)
