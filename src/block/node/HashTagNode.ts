import { convertToLineNodes } from '.'

import type { NodeParser } from '.'

const hashTagRegExp = /^(.*? )?#(\S+)(.*)?$/

export interface HashTagNode {
  type: 'hashTag'
  href: string
}

const createHashTagNode = (href: string): HashTagNode => ({
  type: 'hashTag',
  href
})

export const HashTagNodeParser: NodeParser = (text, { nested, quoted }, next) => {
  if (nested) return next()

  const hashTagMatch = text.match(hashTagRegExp)
  if (!hashTagMatch) return next()

  const [, left, target, right] = hashTagMatch
  return [
    ...convertToLineNodes(left, { nested, quoted }),
    createHashTagNode(target),
    ...convertToLineNodes(right, { nested, quoted })
  ]
}
