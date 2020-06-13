import { convertToLineNodes } from '.'

import type { NodeParser, LineNode } from '.'

const strongRegExp = /^(.*?)\[\[(.+?[\]]*)\]\](.*)$/

export interface StrongNode {
  type: 'strong'
  nodes: LineNode[]
}

const createStrongNode = (nodes: LineNode[]): StrongNode => ({
  type: 'strong',
  nodes
})

export const StrongNodeParser: NodeParser = (
  text,
  { nested, quoted },
  next
) => {
  if (nested) return next()

  const strongMatch = text.match(strongRegExp)
  if (strongMatch === null) return next()

  const [, left, target, right] = strongMatch
  return [
    ...convertToLineNodes(left, { nested, quoted }),
    createStrongNode(convertToLineNodes(target, { nested: true, quoted })),
    ...convertToLineNodes(right, { nested, quoted })
  ]
}
