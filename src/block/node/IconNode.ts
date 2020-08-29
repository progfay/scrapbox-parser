import { convertToLineNodes } from '.'

import type { NodeParser } from '.'

const iconRegExp = /^(.*?)\[([^[\]]*)\.icon(\*(\d+))?\](.*)$/

export interface IconNode {
  type: 'icon'
  pathType: 'root' | 'relative'
  path: string
}

const createIconNode = (path: string): IconNode => ({
  type: 'icon',
  pathType: /^\//.test(path) ? 'root' : 'relative',
  path
})

export const IconNodeParser: NodeParser = (text, { nested, quoted }, next) => {
  if (nested) return next()

  const iconMatch = text.match(iconRegExp)
  if (iconMatch === null) return next()

  const [, left, path, , num = '1', right] = iconMatch
  const iconNodes = new Array(parseInt(num, 10)).fill({}).map(_ => createIconNode(path))

  return [
    ...convertToLineNodes(left, { nested, quoted }),
    ...iconNodes,
    ...convertToLineNodes(right, { nested, quoted })
  ]
}
