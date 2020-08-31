import { createNodeParser } from './creator'

import { convertToLineNodes, LineNode } from '.'
import type { NodeCreator } from './creator'

const strongRegExp = /^(.*?)(\[\[.+?[\]]*\]\])(.*)$/

export interface StrongNode {
  type: 'strong'
  nodes: LineNode[]
}

const createStrongNode: NodeCreator<StrongNode> = (target, opts) => ({
  type: 'strong',
  nodes: convertToLineNodes(target.substring(2, target.length - 2), { ...opts, nested: true })
})

export const StrongNodeParser = createNodeParser(createStrongNode, {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [strongRegExp]
})
