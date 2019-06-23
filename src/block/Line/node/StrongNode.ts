import { LineNodeType } from '.'

export type StrongNodeType = {
  type: 'strong'
  nodes: Array<LineNodeType>
}

export const createQuoteNode = (nodes: Array<LineNodeType>): StrongNodeType => ({
  type: 'strong',
  nodes
})
