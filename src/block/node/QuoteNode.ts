import { convertToNodes } from '.'
import { createNodeParser } from './creator'

import type { QuoteNode } from './type'
import type { NodeCreator } from './creator'

const quoteRegExp = /^>.*$/

const createQuoteNode: NodeCreator<QuoteNode> = (raw, opts) => ({
  type: 'quote',
  raw,
  nodes: convertToNodes(raw.substring(1), { ...opts, quoted: true })
})

export const QuoteNodeParser = createNodeParser(createQuoteNode, {
  parseOnNested: false,
  parseOnQuoted: false,
  patterns: [quoteRegExp]
})
