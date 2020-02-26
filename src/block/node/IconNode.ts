import { NodeParserType, convertToLineNodes } from '.'

const iconRegExp = /^(.*?)\[(.*)\.icon(\*(\d+))?\](.*)$/

export type IconNodeType = {
  readonly type: 'icon'
  readonly pathType: 'root' | 'relative'
  readonly path: string
}

const createIconNode = (path: string): IconNodeType | null => ({
  type: 'icon',
  pathType: /^\//.test(path) ? 'root' : 'relative',
  path
})

export const IconNodeParser: NodeParserType = (text, { nested, quoted }, next) => {
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
