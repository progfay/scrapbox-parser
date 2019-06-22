import { PlainNodeType } from './PlainNode'
import { CodeBlockNodeType } from './CodeBlockNode'
import { TableNodeType } from './TableNode'

export type NodeType = PlainNodeType
                     | CodeBlockNodeType
                     | TableNodeType
