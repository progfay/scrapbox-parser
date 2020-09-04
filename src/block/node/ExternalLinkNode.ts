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
  if (!target.startsWith('[')) {
    return {
      type: 'link',
      pathType: 'absolute',
      href: target,
      content: ''
    }
  }

  const isHrefFirst = /^\[https?:\/\/[^\s\]]/.test(target)
  const match = target.match(isHrefFirst ? /^\[https?:\/\/[^\s\]]+/ : /https?:\/\/[^\s\]]+\]$/)
  if (match === null) {
    return []
  }

  const href = match[0].replace(isHrefFirst ? /^\[/ : /\]$/, '')
  const content = isHrefFirst
    ? target.substring(match[0].length, target.length - 1).trimLeft()
    : target.substring(1, (match.index ?? 1) - 1).trimRight()

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
