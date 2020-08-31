import { createNodeParser } from './creator'

import type { NodeCreator } from './creator'

export interface PlainNode {
  type: 'plain'
  text: string
}

const createPlainNode: NodeCreator<PlainNode> = target => ({
  type: 'plain',
  text: target
})

export const PlainNodeParser = createNodeParser(createPlainNode, {
  parseOnNested: true,
  parseOnQuoted: true,
  patterns: [/^()(.*)()$/]
})
