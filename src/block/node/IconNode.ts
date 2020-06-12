import { convertToLineNodes } from '.'

import type { NodeParser } from '.'

const iconRegExp = /^(.*?)\[(.*)\.icon(\*(\d+))?\](.*)$/

export interface IconNode {
  type: 'icon'
  pathType: 'root' | 'relative'
  path: string
}

const createIconNode = (path: string): IconNode | null => ({
  type: 'icon',
  pathType: /^\//.test(path) ? 'root' : 'relative',
  path
})

export const IconNodeParser: NodeParser = (text, { nested, quoted }, next) => {
  if (nested) return next()

  const iconMatch = text.match(iconRegExp)
  if (!iconMatch) return next()

  const [, left, path, , num = '1', right] = iconMatch
  const iconNode = createIconNode(path)
  return [
    ...convertToLineNodes(left, { nested, quoted }),
    ...new Array(parseInt(num, 10)).fill(iconNode),
    ...convertToLineNodes(right, { nested, quoted })
  ]
}
