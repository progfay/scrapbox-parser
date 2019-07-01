import { ParserType, LineNodeType, convertToLineNodes } from '.'

const quoteRegExp = /^>(.*)$/

export type QuoteNodeType = {
  type: 'quote'
  nodes: Array<LineNodeType>
}

const createQuoteNode = (text: string): QuoteNodeType => ({
  type: 'quote',
  nodes: convertToLineNodes(text, { nested: false, quoted: true })
})

export const QuoteNodeParser: ParserType = (text, { nested, quoted }, next) => {
  if (nested || quoted) return next()
  const quoteMatch = text.match(quoteRegExp)
  if (!quoteMatch) return next()

  const [, target] = quoteMatch
  return [ createQuoteNode(target) ]
}
