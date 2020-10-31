import { createNodeParser } from './creator'

import { convertToNodes } from '.'
import type { StrongNode } from './type'
import type { NodeCreator } from './creator'

const strongRegExp = /\[\[.+?[\]]*\]\]/

const createStrongNode: NodeCreator<StrongNode> = (raw, opts) => ({
  type: 'strong',
  raw,
  nodes: convertToNodes(raw.substring(2, raw.length - 2), { ...opts, nested: true })
})

export const StrongNodeParser = createNodeParser(createStrongNode, {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [strongRegExp]
})
