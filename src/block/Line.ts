import { convertToLineNodes } from './node'

import type { BlockComponentType } from './BlockComponent'
import type { LineNodeType } from './node'

export type LineComponentType = {
  type: 'line'
  component: BlockComponentType
}

export type LineType = {
  indent: number
  type: 'line'
  nodes: LineNodeType[]
}

export const convertToLine = (lineComponent: LineComponentType): LineType => {
  const { indent, text } = lineComponent.component
  return {
    indent,
    type: 'line',
    nodes: convertToLineNodes(text.substring(indent))
  }
}
