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

import type { QuoteNodeType } from './QuoteNode'
import type { HelpfeelNodeType } from './HelpfeelNode'
import type { StrongImageNodeType } from './StrongImageNode'
import type { StrongIconNodeType } from './StrongIconNode'
import type { StrongNodeType } from './StrongNode'
import type { FormulaNodeType } from './FormulaNode'
import type { DecorationNodeType } from './DecorationNode'
import type { CodeNodeType } from './CodeNode'
import type { BlankNodeType } from './BlankNode'
import type { UrlNodeType } from './UrlNode'
import type { GoogleMapNodeType } from './GoogleMapNode'
import type { InternalLinkNodeType } from './InternalLinkNode'
import type { IconNodeType } from './IconNode'
import type { HashTagNodeType } from './HashTagNode'
import type { PlainNodeType } from './PlainNode'

export type LineNodeType =
| QuoteNodeType
| HelpfeelNodeType
| StrongImageNodeType
| StrongIconNodeType
| StrongNodeType
| FormulaNodeType
| DecorationNodeType
| CodeNodeType
| BlankNodeType
| UrlNodeType
| GoogleMapNodeType
| InternalLinkNodeType
| IconNodeType
| HashTagNodeType
| PlainNodeType

export type NodeParserOptionType = {
  nested: boolean
  quoted: boolean
}
export type NextNodeParserType = () => LineNodeType[]
export type NodeParserType = (text: string, opt: NodeParserOptionType, next: NextNodeParserType) => LineNodeType[]

const FalsyEliminator: NodeParserType = (text, _opt, next) => {
  if (!text) return []
  return next()
}

const combineNodeParsers = (...parsers: NodeParserType[]) =>
  (text: string = '', opt: NodeParserOptionType = { nested: false, quoted: false }): LineNodeType[] => (
    parsers.reduceRight(
      (acc: NextNodeParserType, parser: NodeParserType): NextNodeParserType => () => parser(text, opt, acc),
      () => PlainNodeParser(text)
    )()
  )

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
