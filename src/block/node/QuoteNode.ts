import { convertToLineNodes } from '.'
import { createNodeParser } from './creator'

import type { LineNode } from '.'
import type { NodeCreator } from './creator'

const quoteRegExp = /^()(>.*)()$/

export interface QuoteNode {
  type: 'quote'
  nodes: LineNode[]
}

const createQuoteNode: NodeCreator<QuoteNode> = (target, opts) => ({
  type: 'quote',
  nodes: convertToLineNodes(target.substring(1), { ...opts, quoted: true })
})

export const QuoteNodeParser = createNodeParser(createQuoteNode, {
  parseOnNested: false,
  parseOnQuoted: false,
  patterns: [quoteRegExp]
})
