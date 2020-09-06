import { createNodeParser } from './creator'

import type { HashTagNode } from './type'
import type { NodeCreator } from './creator'

const hashTagRegExp = /(?<=^| )#\S+/

const createHashTagNode: NodeCreator<HashTagNode> = target => ({
  type: 'hashTag',
  href: target.substring(1)
})

export const HashTagNodeParser = createNodeParser(createHashTagNode, {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [hashTagRegExp]
})
