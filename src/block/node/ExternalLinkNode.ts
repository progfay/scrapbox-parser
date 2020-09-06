import { createNodeParser } from './creator'

import type { ExternalLinkNode } from './type'
import type { NodeCreator } from './creator'

const hrefFirstUrlRegExp = /\[https?:\/\/[^\s\]]+(?:\s+[^\]]*[^\s])?\]/
const contentFirstUrlRegExp = /\[[^\]]*[^\s]\s+https?:\/\/[^\s\]]+\]/
const httpRegExp = /(?<=^| )https?:\/\/[^\s\]]+/

const createExternalLinkNode: NodeCreator<ExternalLinkNode> = target => {
  if (target.startsWith('[') && target.endsWith(']')) {
    target = target.substring(1, target.length - 1)
  }

  const isHrefFirst = /^https?:\/\/[^\s\]]/.test(target)
  const match = (isHrefFirst ? /^https?:\/\/[^\s\]]+/ : /https?:\/\/[^\s\]]+$/).exec(target)
  if (match === null) {
    return []
  }

  const c = isHrefFirst ? target.substring(match[0].length) : target.substring(0, match.index - 1)

  return {
    type: 'link',
    pathType: 'absolute',
    href: match[0],
    content: c.trim()
  }
}

export const ExternalLinkNodeParser = createNodeParser(createExternalLinkNode, {
  parseOnNested: true,
  parseOnQuoted: true,
  patterns: [hrefFirstUrlRegExp, contentFirstUrlRegExp, httpRegExp]
})
