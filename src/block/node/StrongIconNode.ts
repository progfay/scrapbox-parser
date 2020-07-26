import { convertToLineNodes } from '.'

import type { NodeParser } from '.'

const iconRegExp = /^(.*?)\[\[([^[\]]*)\.icon(\*(\d+))?\]\](.*)$/

export interface StrongIconNode {
  type: 'strongIcon'
  pathType: 'root' | 'relative'
  path: string
}

const createStrongIconNode = (path: string): StrongIconNode => ({
  type: 'strongIcon',
  pathType: /^\//.test(path) ? 'root' : 'relative',
  path
})

export const StrongIconNodeParser: NodeParser = (
  text,
  { nested, quoted },
  next
) => {
  if (nested) return next()

  const iconMatch = text.match(iconRegExp)
  if (iconMatch === null) return next()

  const [, left, path, , num = '1', right] = iconMatch
  const iconNode = createStrongIconNode(path)
  return [
    ...convertToLineNodes(left, { nested, quoted }),
    ...new Array(parseInt(num, 10)).fill(iconNode),
    ...convertToLineNodes(right, { nested, quoted })
  ]
}
