import { NodeParserType, LineNodeType, convertToLineNodes } from '.'

const strongRegExp = /^(.*?)\[\[(.+?[\]]*)\]\](.*)$/

export type StrongNodeType = {
  readonly type: 'strong'
  readonly nodes: LineNodeType[]
}

const createStrongNode = (nodes: LineNodeType[]): StrongNodeType => ({
  type: 'strong',
  nodes
})

export const StrongNodeParser: NodeParserType = (text, { nested, quoted }, next) => {
  if (nested) return next()

  const strongMatch = text.match(strongRegExp)
  if (!strongMatch) return next()

  const [, left, target, right] = strongMatch
  return [
    ...convertToLineNodes(left, { nested, quoted }),
    createStrongNode(convertToLineNodes(target, { nested: true, quoted })),
    ...convertToLineNodes(right, { nested, quoted })
  ]
}
