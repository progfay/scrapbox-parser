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

export const convertToLineNodes = (text: string, nested: boolean = false): Array<LineNodeType> => {
  if (text === '') return []

  if (!nested) {
    if (quoteRegExp.test(text)) {
      const nodes = convertToLineNodes(text.substring(1), true)
      return [ createQuoteNode(nodes) ]
    }

    const strongMatcher = text.match(strongRegExp)
    if (strongMatcher) {
      const [, left, target, right] = strongMatcher
      return [...convertToLineNodes(left), createStrongNode(convertToLineNodes(target)), ...convertToLineNodes(right)]
    }

    const decorationMatcher = text.match(decorationRegExp)
    if (decorationMatcher) {
      const [, left, decoChars, target, right] = decorationMatcher
      return [...convertToLineNodes(left), createDecorationNode(decoChars, convertToLineNodes(target)), ...convertToLineNodes(right)]
    }
  }

  return [ createPlainNode(text) ]
}
