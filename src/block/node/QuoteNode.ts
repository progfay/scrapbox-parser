import { convertToLineNodes } from '.'

import type { NodeParser, LineNode } from '.'

const quoteRegExp = /^>(.*)$/

export interface QuoteNode {
  type: 'quote'
  nodes: LineNode[]
}

const createQuoteNode = (text: string): QuoteNode => ({
  type: 'quote',
  nodes: convertToLineNodes(text, { nested: false, quoted: true })
})

export const QuoteNodeParser: NodeParser = (text, { nested, quoted }, next) => {
  if (nested || quoted) return next()
  const quoteMatch = text.match(quoteRegExp)
  if (quoteMatch === null) return next()

  const [, target] = quoteMatch
  return [createQuoteNode(target)]
}
