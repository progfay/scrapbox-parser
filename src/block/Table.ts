import { convertToNodes } from './node'

import type { BlockComponent } from './BlockComponent'
import type { Node } from './node/type'

export interface TablePack {
  type: 'table'
  components: BlockComponent[]
}

export interface Table {
  indent: number
  type: 'table'
  fileName: string
  cells: Node[][][]
}

export const convertToTable = (pack: TablePack): Table => {
  const { components } = pack
  const [head, ...body] = components
  const { indent, text } = head
  const fileName = text.replace(/^\s*table:/, '')

  return {
    indent,
    type: 'table',
    fileName,
    cells: body
      .map((blockComponent: BlockComponent): string => blockComponent.text.substring(indent + 1))
      .map((text: string): Node[][] =>
        text
          .split('\t')
          .map((block: string): Node[] => convertToNodes(block, { nested: true, quoted: false }))
      )
  }
}
