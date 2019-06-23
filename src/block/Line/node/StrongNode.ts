import { LineNodeType } from '.'

export const strongRegExp = /^(.*?)\[\[(.+?[\]]*)\]\](.*)$/

export type StrongNodeType = {
  type: 'strong'
  nodes: Array<LineNodeType>
}

export const createStrongNode = (nodes: Array<LineNodeType>): StrongNodeType => ({
  type: 'strong',
  nodes
})
