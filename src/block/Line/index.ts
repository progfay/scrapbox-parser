import { BlockComponentType } from '../BlockComponent'
import { PackedBlockComponentType } from '../PackedBlockComponent'
import { createPlainNode, PlainNodeType } from './PlainNode'

export type LineComponentType = {
  type: 'line'
  component: BlockComponentType
}

export type LineNodeType = PlainNodeType

export type LineType = {
  indent: number
  type: 'line'
  nodes: Array<LineNodeType>
}

export const isLineComponent = (packedBlockComponent: PackedBlockComponentType): packedBlockComponent is LineComponentType => (
  packedBlockComponent.type === 'line'
)

export const convertToLine = (lineComponent: LineComponentType): LineType => {
  const { indent, text } = lineComponent.component
  return {
    indent,
    type: 'line',
    nodes: [
      createPlainNode(text.substring(indent))
    ]
  }
}
