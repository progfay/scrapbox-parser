import { createNodeParser } from './creator'

import type { PlainNode } from './type'
import type { NodeCreator } from './creator'

const createPlainNode: NodeCreator<PlainNode> = target => ({
  type: 'plain',
  text: target
})

export const PlainNodeParser = createNodeParser(createPlainNode, {
  parseOnNested: true,
  parseOnQuoted: true,
  patterns: [/^()(.*)()$/]
})
