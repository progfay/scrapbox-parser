import { NodeParserType, convertToLineNodes } from '.'

const iconRegExp = /^(.*?)\[\[(.*)\.icon(\*(\d+))?\]\](.*)$/

export type StrongIconNodeType = {
  type: 'strongIcon'
  pathType: 'root' | 'relative'
  path: string
}

const createStrongIconNode = (path: string): StrongIconNodeType => ({
  type: 'strongIcon',
  pathType: /^\//.test(path) ? 'root' : 'relative',
  path
})

export const StrongIconNodeParser: NodeParserType = (text, { nested, quoted }, next) => {
  if (nested) return next()

  const iconMatch = text.match(iconRegExp)
  if (!iconMatch) return next()

  const [, left, path, , num = '1', right] = iconMatch
  const iconNode = createStrongIconNode(path)
  return [
    ...convertToLineNodes(left, { nested, quoted }),
    ...new Array(parseInt(num, 10)).fill(iconNode),
    ...convertToLineNodes(right, { nested, quoted })
  ]
}
