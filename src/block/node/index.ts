import { QuoteNodeParser } from './QuoteNode'
import { HelpfeelNodeParser } from './HelpfeelNode'
import { StrongImageNodeParser } from './StrongImageNode'
import { StrongIconNodeParser } from './StrongIconNode'
import { StrongNodeParser } from './StrongNode'
import { FormulaNodeParser } from './FormulaNode'
import { DecorationNodeParser } from './DecorationNode'
import { CodeNodeParser } from './CodeNode'
import { BlankNodeParser } from './BlankNode'
import { ImageNodeParser } from './ImageNode'
import { ExternalLinkNodeParser } from './ExternalLinkNode'
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
import type { ImageNode } from './ImageNode'
import type { ExternalLinkNode } from './ExternalLinkNode'
import type { GoogleMapNode } from './GoogleMapNode'
import type { InternalLinkNode } from './InternalLinkNode'
import type { IconNode } from './IconNode'
import type { HashTagNode } from './HashTagNode'
import type { PlainNode } from './PlainNode'

/**
 * @deprecated
 */
export type UrlNode = ImageNode | ExternalLinkNode

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
  | ImageNode
  | ExternalLinkNode
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
