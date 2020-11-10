import { convertToNodes } from './node'

import type { BlockComponent } from './BlockComponent'
import type { Node } from './node/type'

export interface LinePack {
  type: 'line'
  components: [BlockComponent]
}

export interface Line {
  indent: number
  type: 'line'
  nodes: Node[]
}

export const convertToLine = (pack: LinePack): Line => {
  const { indent, text } = pack.components[0]
  return {
    indent,
    type: 'line',
    nodes: convertToNodes(text.substring(indent))
  }
}
