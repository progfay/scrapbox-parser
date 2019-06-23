import { LineNodeType } from '.'

export type QuoteNodeType = {
  type: 'quote'
  nodes: Array<LineNodeType>
}

export const createQuoteNode = (nodes: Array<LineNodeType>): QuoteNodeType => ({
  type: 'quote',
  nodes
})
