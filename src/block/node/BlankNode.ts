import { ParserType, convertToLineNodes } from '.'

const blankRegExp = /^(.*?)\[(\s+)\](.*)$/

export type BlankNodeType = {
  type: 'blank'
  text: string
}

const createBlankNode = (text: string): BlankNodeType => ({
  type: 'blank',
  text
})

export const BlankNodeParser: ParserType = (text, { nested, quoted }, next) => {
  if (nested) return next()

  const blankMatch = text.match(blankRegExp)
  if (blankMatch) {
    const [, left, target, right] = blankMatch
    return [
      ...convertToLineNodes(left, { nested, quoted }),
      createBlankNode(target),
      ...convertToLineNodes(right, { nested, quoted })
    ]
  }

  return next()
}
