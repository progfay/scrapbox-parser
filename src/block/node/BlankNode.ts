import { convertToLineNodes } from '.'

import type { NodeParser } from '.'

const blankRegExp = /^(.*?)\[(\s+)\](.*)$/

export interface BlankNode {
  type: 'blank'
  text: string
}

const createBlankNode = (text: string): BlankNode => ({
  type: 'blank',
  text
})

export const BlankNodeParser: NodeParser = (text, { nested, quoted }, next) => {
  if (nested) return next()

  const blankMatch = text.match(blankRegExp)

  if (blankMatch === null) return next()

  const [, left, target, right] = blankMatch
  return [
    ...convertToLineNodes(left, { nested, quoted }),
    createBlankNode(target),
    ...convertToLineNodes(right, { nested, quoted })
  ]
}
