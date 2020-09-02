import { createNodeParser } from './creator'

import type { NodeCreator } from './creator'

const hrefFirstUrlRegExp = /^(.*?)(\[https?:\/\/[^\s\]]+(?:\s+[^\]]*[^\s])?\])(.*)$/
const contentFirstUrlRegExp = /^(.*?)(\[[^\]]*[^\s]\s+https?:\/\/[^\s\]]+\])(.*)$/
const httpRegExp = /^(.*?\s)?(https?:\/\/[^\s\]]+)(.*)$/

export interface ExternalLinkNode {
  type: 'link'
  pathType: 'absolute'
  href: string
  content: string
}

const createExternalLinkNode: NodeCreator<ExternalLinkNode> = target => {
  if (target.startsWith('[') && target.endsWith(']')) {
    target = target.substring(1, target.length - 1)
  }

  const isHrefFirst = /^https?:\/\/[^\s\]]/.test(target)
  const match = target.match(isHrefFirst ? /^https?:\/\/[^\s\]]+/ : /https?:\/\/[^\s\]]+$/)
  if (match === null) {
    return []
  }

  const href = match[0]
  const content = isHrefFirst
    ? target.substring(href.length).trimLeft()
    : target.substring(0, (match.index ?? 1) - 1).trimRight()

  return {
    type: 'link',
    pathType: 'absolute',
    href,
    content
  }
}

export const ExternalLinkNodeParser = createNodeParser(createExternalLinkNode, {
  parseOnNested: true,
  parseOnQuoted: true,
  patterns: [hrefFirstUrlRegExp, contentFirstUrlRegExp, httpRegExp]
})
