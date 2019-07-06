import { BlockComponentType } from './BlockComponent'
import { PackedBlockComponentType } from './PackedBlockComponent'
import { convertToLineNodes, LineNodeType } from './node'

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

export const isTableComponent = (packedBlockComponent: PackedBlockComponentType): packedBlockComponent is TableComponentType => (
  packedBlockComponent.type === 'table'
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
      .map((block: string): LineNodeType[][] => block
        .split('\t')
        .map((block: string): LineNodeType[] => convertToLineNodes(block, { nested: true, quoted: false }))
      )
  }
}
