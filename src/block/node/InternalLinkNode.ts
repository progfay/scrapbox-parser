import { createNodeParser } from './creator'

import type { LinkNode } from './type'
import type { NodeCreator } from './creator'

const internalLinkRegExp = /\[\/?[^[\]]+\]/

const createInternalLinkNode: NodeCreator<LinkNode> = target => {
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
