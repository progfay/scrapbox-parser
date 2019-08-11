import { QuoteNodeType, QuoteNodeParser } from './QuoteNode'
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

export type ParserOptionType = {
  nested: boolean
  quoted: boolean
}
export type NextParserType = () => LineNodeType[]
export type ParserType = (text: string, opt: ParserOptionType, next: NextParserType) => LineNodeType[]

const FalsyEliminator: ParserType = (text, _opt, next) => {
  if (!text) return []
  return next()
}

const combineNodeParsers = (...parsers: ParserType[]) => {
  return (text: string = '', opt: ParserOptionType = { nested: false, quoted: false }): LineNodeType[] => (
    parsers.slice().reverse().reduce(
      (acc: NextParserType, parser: ParserType): NextParserType => () => parser(text, opt, acc),
      () => PlainNodeParser(text)
    )()
  )
}

export const convertToLineNodes = combineNodeParsers(
  FalsyEliminator,
  QuoteNodeParser,
  CodeNodeParser,
  FormulaNodeParser,
  BlankNodeParser,
  StrongImageNodeParser,
  StrongIconNodeParser,
  StrongNodeParser,
  UrlNodeParser,
  DecorationNodeParser,
  IconNodeParser,
  GoogleMapNodeParser,
  InternalLinkNodeParser,
  HashTagNodeParser
)
