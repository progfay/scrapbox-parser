import { createNodeParser } from './creator'

import type { NodeCreator } from './creator'

const strongIconRegExp = /^(.*?)(\[\[[^[\]]*\.icon(?:\*\d+)?\]\])(.*)$/

export interface StrongIconNode {
  type: 'strongIcon'
  pathType: 'root' | 'relative'
  path: string
}

const createStrongIconNode: NodeCreator<StrongIconNode> = target => {
  const index = target.lastIndexOf('.icon')
  const path = target.substring(2, index)
  const numStr = target.substring(index + 5, target.length - 2)
  const num = numStr.startsWith('*') ? parseInt(numStr.substring(1), 10) : 1
  return new Array(num).fill({}).map(() => ({
    type: 'strongIcon',
    pathType: path.startsWith('/') ? 'root' : 'relative',
    path
  }))
}

export const StrongIconNodeParser = createNodeParser(createStrongIconNode, {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [strongIconRegExp]
})
