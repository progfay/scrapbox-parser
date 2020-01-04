import { LineNodeType } from '.'

export type PlainNodeType = {
  type: 'plain'
  text: string
}

const createPlainNode = (text: string): PlainNodeType => ({
  type: 'plain',
  text
})

export const PlainNodeParser = (text: string): LineNodeType[] => {
  return [createPlainNode(text)]
}
