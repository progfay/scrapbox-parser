import { QuoteNodeType } from './QuoteNode'
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

export const convertToLineNodes = (text: string): Array<LineNodeType> => {
  return [ createPlainNode(text) ]
}
