import { convertToNodes } from './node'

import type { BlockComponent } from './BlockComponent'
import type { Node } from './node/type'

export interface LineComponent {
  type: 'line'
  component: BlockComponent
}

export interface Line {
  indent: number
  type: 'line'
  nodes: Node[]
}

export const convertToLine = (lineComponent: LineComponent): Line => {
  const { indent, text } = lineComponent.component
  return {
    indent,
    type: 'line',
    nodes: convertToNodes(text.substring(indent))
  }
}
