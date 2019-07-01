import { ParserType, LineNodeType, convertToLineNodes } from '.'

const strongRegExp = /^(.*?)\[\[(.+?[\]]*)\]\](.*)$/

export type StrongNodeType = {
  type: 'strong'
  nodes: Array<LineNodeType>
}

const createStrongNode = (nodes: Array<LineNodeType>): StrongNodeType => ({
  type: 'strong',
  nodes
})

export const StrongNodeParser: ParserType = (text, { nested, quoted }, next) => {
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
