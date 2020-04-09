import { convertToLineNodes } from '.'

import type { NodeParserType, LineNodeType } from '.'

const strongRegExp = /^(.*?)\[\[(.+?[\]]*)\]\](.*)$/

export type StrongNodeType = {
  type: 'strong'
  nodes: LineNodeType[]
}

const createStrongNode = (nodes: LineNodeType[]): StrongNodeType => ({
  type: 'strong',
  nodes
})

export const StrongNodeParser: NodeParserType = (text, { nested, quoted }, next) => {
  if (nested) return next()

  const strongMatch = text.match(strongRegExp)
  if (!strongMatch) return next()

  const [, left, target, right] = strongMatch
  return [
    ...convertToLineNodes(left, { nested, quoted }),
    createStrongNode(convertToLineNodes(target, { nested: true, quoted })),
    ...convertToLineNodes(right, { nested, quoted })
  ]
}
