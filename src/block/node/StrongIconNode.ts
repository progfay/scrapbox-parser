import { createNodeParser } from './creator'
import { generateIconNodeCreator } from './IconNode'

import type { NodeCreator } from './creator'

const strongIconRegExp = /\[\[[^[\]]*\.icon(?:\*\d+)?\]\]/

export interface StrongIconNode {
  type: 'strongIcon'
  pathType: 'root' | 'relative'
  path: string
}

const createStrongIconNode = generateIconNodeCreator('strongIcon') as NodeCreator<StrongIconNode>

export const StrongIconNodeParser = createNodeParser(createStrongIconNode, {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [strongIconRegExp]
})
