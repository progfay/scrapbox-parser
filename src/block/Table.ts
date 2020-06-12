import { convertToLineNodes } from './node'

import type { BlockComponent } from './BlockComponent'
import type { PackedBlockComponent } from './PackedBlockComponent'
import type { LineNode } from './node'

export interface TableComponent {
  type: 'table'
  components: BlockComponent[]
}

export interface Table {
  indent: number
  type: 'table'
  fileName: string
  cells: LineNode[][][]
}

export const isTableComponent = (component: PackedBlockComponent): component is TableComponent => (
  component.type === 'table'
)

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
      .map((text: string): LineNode[][] => text
        .split('\t')
        .map((block: string): LineNode[] => convertToLineNodes(block, { nested: true, quoted: false }))
      )
  }
}
