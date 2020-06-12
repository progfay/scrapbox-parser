import { convertToLineNodes } from '.'

import type { NodeParser } from '.'

const internalLinkRegExp = /^(.*?)\[(\/?[^[\]]+)\](.*)$/

export interface InternalLinkNode {
  type: 'link'
  pathType: 'root' | 'relative'
  href: string
  content: string
}

const createInternalLinkNode = (href: string): InternalLinkNode => ({
  type: 'link',
  pathType: /^\/.*$/.test(href) ? 'root' : 'relative',
  href,
  content: ''
})

export const InternalLinkNodeParser: NodeParser = (text, { nested, quoted }, next) => {
  const internalLinkMatch = text.match(internalLinkRegExp)
  if (internalLinkMatch === null) return next()

  const [, left, target, right] = internalLinkMatch
  return [
    ...convertToLineNodes(left, { nested, quoted }),
    createInternalLinkNode(target),
    ...convertToLineNodes(right, { nested, quoted })
  ]
}
