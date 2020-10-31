import { createNodeParser } from './creator'

import type { PlainNode } from './type'
import type { NodeCreator } from './creator'

const createPlainNode: NodeCreator<PlainNode> = raw => ({
  type: 'plain',
  raw,
  text: raw
})

export const PlainNodeParser = createNodeParser(createPlainNode, {
  parseOnNested: true,
  parseOnQuoted: true,
  patterns: [/^()(.*)()$/]
})
