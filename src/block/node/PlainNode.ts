import type { LineNode } from '.'

export interface PlainNode {
  type: 'plain'
  text: string
}

const createPlainNode = (text: string): PlainNode => ({
  type: 'plain',
  text
})

export const PlainNodeParser = (text: string): LineNode[] => {
  return [createPlainNode(text)]
}
