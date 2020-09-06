import { createNodeParser } from './creator'

import type { NodeCreator } from './creator'

const iconRegExp = /^(.*?)(\[[^[\]]*\.icon(?:\*[1-9]\d*)?\])(.*)$/

export interface IconNode {
  type: 'icon'
  pathType: 'root' | 'relative'
  path: string
}

export const parseIcon = (
  target: string
): [pathInfo: { pathType: 'root' | 'relative'; path: string }, num: number] => {
  const index = target.lastIndexOf('.icon')
  const path = target.substring(0, index)
  const numStr = target.substring(index + 5, target.length)
  const num = numStr.startsWith('*') ? parseInt(numStr.substring(1), 10) : 1
  return [{ path, pathType: path.startsWith('/') ? 'root' : 'relative' }, num]
}

const createIconNode: NodeCreator<IconNode> = target => {
  const [pathInfo, num] = parseIcon(target.substring(1, target.length - 1))
  return new Array(num).fill({}).map(() => ({ ...pathInfo, type: 'icon' }))
}

export const IconNodeParser = createNodeParser(createIconNode, {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [iconRegExp]
})
