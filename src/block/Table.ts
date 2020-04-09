import { convertToLineNodes } from './node'

import type { BlockComponentType } from './BlockComponent'
import type { PackedBlockComponentType } from './PackedBlockComponent'
import type { LineNodeType } from './node'

export type TableComponentType = {
  type: 'table'
  components: BlockComponentType[]
}

export type TableType = {
  indent: number
  type: 'table'
  fileName: string
  cells: LineNodeType[][][]
}

export const isTableComponent = (component: PackedBlockComponentType): component is TableComponentType => (
  component.type === 'table'
)

export const convertToTable = (tableComponent: TableComponentType): TableType => {
  const { components } = tableComponent
  const [head, ...body] = components
  const { indent, text } = head
  const fileName = text.replace(/^\s*table:/, '')

  return {
    indent,
    type: 'table',
    fileName,
    cells: body
      .map((blockComponent: BlockComponentType): string => blockComponent.text.substring(indent + 1))
      .map((text: string): LineNodeType[][] => text
        .split('\t')
        .map((block: string): LineNodeType[] => convertToLineNodes(block, { nested: true, quoted: false }))
      )
  }
}
