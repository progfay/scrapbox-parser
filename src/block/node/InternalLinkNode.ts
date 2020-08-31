import { createNodeParser } from './creator'

import type { NodeCreator } from './creator'

const internalLinkRegExp = /^(.*?)(\[\/?[^[\]]+\])(.*)$/

export interface InternalLinkNode {
  type: 'link'
  pathType: 'root' | 'relative'
  href: string
  content: string
}

const createInternalLinkNode: NodeCreator<InternalLinkNode> = target => {
  const href = target.substring(1, target.length - 1)
  return {
    type: 'link',
    pathType: href.startsWith('/') ? 'root' : 'relative',
    href,
    content: ''
  }
}

export const InternalLinkNodeParser = createNodeParser(createInternalLinkNode, {
  parseOnNested: true,
  parseOnQuoted: true,
  patterns: [internalLinkRegExp]
})
