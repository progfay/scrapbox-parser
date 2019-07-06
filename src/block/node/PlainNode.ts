import { LineNodeType } from '.'

export type PlainNodeType = {
  type: 'plain'
  text: string
}

export const createPlainNode = (text: string): PlainNodeType => ({
  type: 'plain',
  text: text
})

export const PlainNodeParser = (text: string): LineNodeType[] => {
  return [ createPlainNode(text) ]
}
