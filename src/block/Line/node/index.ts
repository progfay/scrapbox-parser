import { QuoteNodeType, createQuoteNode, quoteRegExp } from './QuoteNode'
import { StrongNodeType, createStrongNode, strongRegExp } from './StrongNode'
import { DecorationNodeType, createDecorationNode, decorationRegExp } from './DecorationNode'
import { CodeNodeType, createCodeNode, codeRegExp, codeCommandRegExp } from './CodeNode'
import { LinkNodeType, createLinkNode, urlRegExp } from './LinkNode'
import { ImageNodeType } from './ImageNode'
import { IconNodeType } from './IconNode'
import { PlainNodeType, createPlainNode } from './PlainNode'

export type LineNodeType = QuoteNodeType
                         | StrongNodeType
                         | DecorationNodeType
                         | CodeNodeType
                         | LinkNodeType
                         | ImageNodeType
                         | IconNodeType
                         | PlainNodeType

const brakcetRegExp = /^(.*?)\[([^[\]]+)\](.*)$/

export const convertToLineNodes = (text: string, { nested, quoted } = { nested: false, quoted: false }): Array<LineNodeType> => {
  if (text === '') return []

  if (!nested && !quoted) {
    const quoteMatch = text.match(quoteRegExp)
    if (quoteMatch) {
      const [, target] = quoteMatch
      const nodes = convertToLineNodes(target, { nested, quoted: true })
      return [ createQuoteNode(nodes) ]
    }
  }

  if (!nested) {
    const codeCommandMatch = text.match(codeCommandRegExp)
    if (codeCommandMatch) {
      const [, target] = codeCommandMatch
      return [ createCodeNode(target) ]
    }

    const codeMatch = text.match(codeRegExp)
    if (codeMatch) {
      const [, left, target, right] = codeMatch
      return [
        ...convertToLineNodes(left, { nested, quoted }),
        createCodeNode(target),
        ...convertToLineNodes(right, { nested, quoted })
      ]
    }

    const strongMatch = text.match(strongRegExp)
    if (strongMatch) {
      const [, left, target, right] = strongMatch
      return [
        ...convertToLineNodes(left, { nested, quoted }),
        createStrongNode(convertToLineNodes(target, { nested: true, quoted })),
        ...convertToLineNodes(right, { nested, quoted })
      ]
    }

    const decorationMatch = text.match(decorationRegExp)
    if (decorationMatch) {
      const [, left, decoChars, target, right] = decorationMatch
      return [
        ...convertToLineNodes(left, { nested, quoted }),
        createDecorationNode(decoChars, convertToLineNodes(target, { nested: true, quoted })),
        ...convertToLineNodes(right, { nested, quoted })
      ]
    }
  }

  const brakcetMatch = text.match(brakcetRegExp)
  if (brakcetMatch) {
    const [, left, target, right] = brakcetMatch

    const lineNode: LineNodeType = createLinkNode(target)

    return [
      ...convertToLineNodes(left, { nested, quoted }),
      lineNode,
      ...convertToLineNodes(right, { nested, quoted })
    ]
  }

  const urlMatch = text.match(urlRegExp)
  if (urlMatch) {
    const [, left, target, right] = urlMatch
    return [
      ...convertToLineNodes(left, { nested, quoted }),
      createLinkNode(target),
      ...convertToLineNodes(right, { nested, quoted })
    ]
  }

  return [ createPlainNode(text) ]
}
