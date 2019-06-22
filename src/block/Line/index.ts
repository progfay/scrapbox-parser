import { BlockComponentType } from '../BlockComponent'
import { PackedBlockComponentType } from '../PackedBlockComponent'
import { createPlainNode } from './PlainNode'

export type LineComponentType = {
  type: 'line'
  component: BlockComponentType
}

export type LineNodeType = {}

export type LineType = {
  type: 'line'
  nodes: Array<LineNodeType>
}

export const isLineComponent = (packedBlockComponent: PackedBlockComponentType): packedBlockComponent is LineComponentType => (
  packedBlockComponent.type === 'line'
)

export const convertToLine = (lineComponent: LineComponentType): LineType => {
  return {
    type: 'line',
    nodes: [
      createPlainNode(lineComponent.component.text)
    ]
  }
}
