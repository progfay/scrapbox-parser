import { LineNodeType } from '.'

export type PlainNodeType = {
  readonly type: 'plain'
  readonly text: string
}

const createPlainNode = (text: string): PlainNodeType => ({
  type: 'plain',
  text
})

export const PlainNodeParser = (text: string): LineNodeType[] => {
  return [createPlainNode(text)]
}
