import { LineNodeType } from '.'

export const quoteRegExp = /^>(.*)$/

export type QuoteNodeType = {
  type: 'quote'
  nodes: Array<LineNodeType>
}

export const createQuoteNode = (nodes: Array<LineNodeType>): QuoteNodeType => ({
  type: 'quote',
  nodes
})
