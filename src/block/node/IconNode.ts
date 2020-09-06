import { createNodeParser } from './creator'

import type { NodeCreator } from './creator'
import type { StrongIconNode } from './StrongIconNode'

const iconRegExp = /\[[^[\]]*\.icon(?:\*[1-9]\d*)?\]/

export interface IconNode {
  type: 'icon'
  pathType: 'root' | 'relative'
  path: string
}

export function generateIconNodeCreator(
  type: (IconNode | StrongIconNode)['type']
): NodeCreator<IconNode | StrongIconNode> {
  return target => {
    switch (type) {
      case 'icon':
        target = target.substring(1, target.length - 1)
        break

      case 'strongIcon':
        target = target.substring(2, target.length - 2)
        break
    }

    const index = target.lastIndexOf('.icon')
    const path = target.substring(0, index)
    const pathType = path.startsWith('/') ? 'root' : 'relative'
    const numStr = target.substring(index + 5, target.length)
    const num = numStr.startsWith('*') ? parseInt(numStr.substring(1), 10) : 1
    return new Array(num).fill({}).map(() => ({ path, pathType, type }))
  }
}

const createIconNode = generateIconNodeCreator('icon') as NodeCreator<IconNode>

export const IconNodeParser = createNodeParser(createIconNode, {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [iconRegExp]
})
