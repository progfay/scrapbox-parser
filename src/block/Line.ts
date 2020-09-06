import { convertToLineNodes } from './node'

import type { BlockComponent } from './BlockComponent'
import type { LineNode } from './node/type'

export interface LineComponent {
  type: 'line'
  component: BlockComponent
}

export interface Line {
  indent: number
  type: 'line'
  nodes: LineNode[]
}

export const convertToLine = (lineComponent: LineComponent): Line => {
  const { indent, text } = lineComponent.component
  return {
    indent,
    type: 'line',
    nodes: convertToLineNodes(text.substring(indent))
  }
}
