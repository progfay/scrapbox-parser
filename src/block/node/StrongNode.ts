import { createNodeParser } from './creator'

import { convertToNodes } from '.'
import type { StrongNode } from './type'
import type { NodeCreator } from './creator'

const strongRegExp = /\[\[.+?[\]]*\]\]/

const createStrongNode: NodeCreator<StrongNode> = (target, opts) => ({
  type: 'strong',
  nodes: convertToNodes(target.substring(2, target.length - 2), { ...opts, nested: true })
})

export const StrongNodeParser = createNodeParser(createStrongNode, {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [strongRegExp]
})
