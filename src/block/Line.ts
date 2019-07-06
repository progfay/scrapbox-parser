import { BlockComponentType } from './BlockComponent'
import { LineNodeType, convertToLineNodes } from './node'

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
