import { createNodeParser } from './creator'

import type { NodeCreator } from './creator'

const iconRegExp = /^(.*?)(\[[^[\]]*\.icon(?:\*[1-9]\d*)?\])(.*)$/

export interface IconNode {
  type: 'icon'
  pathType: 'root' | 'relative'
  path: string
}

const createIconNode: NodeCreator<IconNode> = target => {
  const index = target.lastIndexOf('.icon')
  const path = target.substring(1, index)
  const numStr = target.substring(index + 5, target.length - 1)
  const num = numStr.startsWith('*') ? parseInt(numStr.substring(1), 10) : 1
  return new Array(num).fill({}).map(() => ({
    type: 'icon',
    pathType: path.startsWith('/') ? 'root' : 'relative',
    path
  }))
}

export const IconNodeParser = createNodeParser(createIconNode, {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [iconRegExp]
})
