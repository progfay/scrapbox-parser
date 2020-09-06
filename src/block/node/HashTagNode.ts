import { createNodeParser } from './creator'

import type { NodeCreator } from './creator'

const hashTagRegExp = /(?<=^| )#\S+/

export interface HashTagNode {
  type: 'hashTag'
  href: string
}

const createHashTagNode: NodeCreator<HashTagNode> = target => ({
  type: 'hashTag',
  href: target.substring(1)
})

export const HashTagNodeParser = createNodeParser(createHashTagNode, {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [hashTagRegExp]
})
