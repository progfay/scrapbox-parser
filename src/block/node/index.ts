import { QuoteNodeType, QuoteNodeParser } from './QuoteNode'
import { HelpfeelNodeType, HelpfeelNodeParser } from './HelpfeelNode'
import { StrongImageNodeType, StrongImageNodeParser } from './StrongImageNode'
import { StrongIconNodeType, StrongIconNodeParser } from './StrongIconNode'
import { StrongNodeType, StrongNodeParser } from './StrongNode'
import { FormulaNodeType, FormulaNodeParser } from './FormulaNode'
import { DecorationNodeType, DecorationNodeParser } from './DecorationNode'
import { CodeNodeType, CodeNodeParser } from './CodeNode'
import { BlankNodeType, BlankNodeParser } from './BlankNode'
import { UrlNodeType, UrlNodeParser } from './UrlNode'
import { GoogleMapNodeType, GoogleMapNodeParser } from './GoogleMapNode'
import { InternalLinkNodeType, InternalLinkNodeParser } from './InternalLinkNode'
import { IconNodeType, IconNodeParser } from './IconNode'
import { HashTagNodeType, HashTagNodeParser } from './HashTagNode'
import { PlainNodeType, PlainNodeParser } from './PlainNode'

export type LineNodeType = QuoteNodeType
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
  readonly nested: boolean
  readonly quoted: boolean
}
export type NextNodeParserType = () => LineNodeType[]
export type NodeParserType = (text: string, opt: NodeParserOptionType, next: NextNodeParserType) => LineNodeType[]

const FalsyEliminator: NodeParserType = (text, _opt, next) => {
  if (!text) return []
  return next()
}

const combineNodeParsers = (...parsers: NodeParserType[]) => {
  return (text: string = '', opt: NodeParserOptionType = { nested: false, quoted: false }): LineNodeType[] => (
    parsers.slice().reverse().reduce(
      (acc: NextNodeParserType, parser: NodeParserType): NextNodeParserType => () => parser(text, opt, acc),
      () => PlainNodeParser(text)
    )()
  )
}

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
