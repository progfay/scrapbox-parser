import { QuoteNodeType, createQuoteNode, quoteRegExp } from './QuoteNode'
import { StrongNodeType } from './StrongNode'
import { DecorationNodeType } from './DecorationNode'
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
  }

  return [ createPlainNode(text) ]
}
