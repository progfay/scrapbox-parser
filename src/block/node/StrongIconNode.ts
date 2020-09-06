import { createNodeParser } from './creator'
import { parseIcon } from './IconNode'

import type { NodeCreator } from './creator'

const strongIconRegExp = /^(.*?)(\[\[[^[\]]*\.icon(?:\*\d+)?\]\])(.*)$/

export interface StrongIconNode {
  type: 'strongIcon'
  pathType: 'root' | 'relative'
  path: string
}

const createStrongIconNode: NodeCreator<StrongIconNode> = target => {
  const [pathInfo, num] = parseIcon(target.substring(2, target.length - 2))
  return new Array(num).fill({}).map(() => ({ ...pathInfo, type: 'strongIcon' }))
}

export const StrongIconNodeParser = createNodeParser(createStrongIconNode, {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [strongIconRegExp]
})
