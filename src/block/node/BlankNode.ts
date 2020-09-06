import { createNodeParser } from './creator'

import type { NodeCreator } from './creator'

const blankRegExp = /\[\s+\]/

export interface BlankNode {
  type: 'blank'
  text: string
}

const createBlankNode: NodeCreator<BlankNode> = (target: string) => ({
  type: 'blank',
  text: target.substring(1, target.length - 1)
})

export const BlankNodeParser = createNodeParser(createBlankNode, {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [blankRegExp]
})
