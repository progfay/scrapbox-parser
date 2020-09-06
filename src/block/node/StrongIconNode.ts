import { createNodeParser } from './creator'
import { generateIconNodeCreator } from './IconNode'

import type { StrongIconNode } from './type'
import type { NodeCreator } from './creator'

const strongIconRegExp = /\[\[[^[\]]*\.icon(?:\*\d+)?\]\]/

const createStrongIconNode = generateIconNodeCreator('strongIcon') as NodeCreator<StrongIconNode>

export const StrongIconNodeParser = createNodeParser(createStrongIconNode, {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [strongIconRegExp]
})
