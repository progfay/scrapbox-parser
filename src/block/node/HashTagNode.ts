import { NodeParserType, convertToLineNodes } from '.'

const hashTagRegExp = /^(.*? )?#(\S+)(.*)?$/

export type HashTagNodeType = {
  readonly type: 'hashTag'
  readonly href: string
}

const createHashTagNode = (href: string): HashTagNodeType => ({
  type: 'hashTag',
  href
})

export const HashTagNodeParser: NodeParserType = (text, { nested, quoted }, next) => {
  if (nested) return next()

  const hashTagMatch = text.match(hashTagRegExp)
  if (!hashTagMatch) return next()

  const [, left, target, right] = hashTagMatch
  return [
    ...convertToLineNodes(left, { nested, quoted }),
    createHashTagNode(target),
    ...convertToLineNodes(right, { nested, quoted })
  ]
}
