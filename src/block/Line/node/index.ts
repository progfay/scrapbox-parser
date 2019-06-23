import { QuoteNodeType, createQuoteNode, quoteRegExp } from './QuoteNode'
import { StrongNodeType, createStrongNode, strongRegExp } from './StrongNode'
import { DecorationNodeType, createDecorationNode, decorationRegExp } from './DecorationNode'
import { CodeNodeType } from './CodeNode'
import { LinkNodeType } from './LinkNode'
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

export const convertToLineNodes = (text: string, { nested, quoted } = { nested: false, quoted: false }): Array<LineNodeType> => {
  if (text === '') return []

  if (!quoted) {
    const quoteMatch = text.match(quoteRegExp)
    if (quoteMatch) {
      const [, content] = quoteMatch
      const nodes = convertToLineNodes(content, { nested, quoted: true })
      return [ createQuoteNode(nodes) ]
    }
  }

  if (!nested) {
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

  return [ createPlainNode(text) ]
}
