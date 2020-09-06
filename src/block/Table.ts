import { convertToNodes } from './node'

import type { BlockComponent } from './BlockComponent'
import type { PackedBlockComponent } from './PackedBlockComponent'
import type { Node } from './node/type'

export interface TableComponent {
  type: 'table'
  components: BlockComponent[]
}

export interface Table {
  indent: number
  type: 'table'
  fileName: string
  cells: Node[][][]
}

export const isTableComponent = (component: PackedBlockComponent): component is TableComponent =>
  component.type === 'table'

export const convertToTable = (tableComponent: TableComponent): Table => {
  const { components } = tableComponent
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
