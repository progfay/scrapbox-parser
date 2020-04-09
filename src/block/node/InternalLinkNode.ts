import { convertToLineNodes } from '.'

import type { NodeParserType } from '.'

const internalLinkRegExp = /^(.*?)\[(\/?[^[\]]+)\](.*)$/

export type InternalLinkNodeType = {
  type: 'link'
  pathType: 'root' | 'relative'
  href: string,
  content: string
}

const createInternalLinkNode = (href: string): InternalLinkNodeType => ({
  type: 'link',
  pathType: /^\/.*$/.test(href) ? 'root' : 'relative',
  href,
  content: ''
})

export const InternalLinkNodeParser: NodeParserType = (text, { nested, quoted }, next) => {
  const internalLinkMatch = text.match(internalLinkRegExp)
  if (!internalLinkMatch) return next()

  const [, left, target, right] = internalLinkMatch
  return [
    ...convertToLineNodes(left, { nested, quoted }),
    createInternalLinkNode(target),
    ...convertToLineNodes(right, { nested, quoted })
  ]
}
