import { BlockComponentType } from './BlockComponent'
import { LineNodeType, convertToLineNodes } from './node'

export type LineComponentType = {
  readonly type: 'line'
  readonly component: BlockComponentType
}

export type LineType = {
  readonly indent: number
  readonly type: 'line'
  readonly nodes: ReadonlyArray<LineNodeType>
}

export const convertToLine = (lineComponent: LineComponentType): LineType => {
  const { indent, text } = lineComponent.component
  return {
    indent,
    type: 'line',
    nodes: convertToLineNodes(text.substring(indent))
  }
}
