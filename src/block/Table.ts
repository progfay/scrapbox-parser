import { BlockComponentType } from './BlockComponent'
import { PackedBlockComponentType } from './PackedBlockComponent'
import { convertToLineNodes, LineNodeType } from './node'

export type TableComponentType = {
  type: 'table'
  components: Array<BlockComponentType>
}

export type TableType = {
  indent: number
  type: 'table'
  fileName: string
  cells: Array<Array<Array<LineNodeType>>>
}

export const isTableComponent = (packedBlockComponent: PackedBlockComponentType): packedBlockComponent is TableComponentType => (
  packedBlockComponent.type === 'table'
)

export const convertToTable = (tableComponent: TableComponentType): TableType => {
  const { components } = tableComponent
  const head: BlockComponentType = components.shift() || { indent: 0, text: '' }
  const { indent, text } = head
  const match = text.match(/^\s*table:(.+)$/)
  if (!match) {
    return {
      indent: 0,
      type: 'table',
      fileName: '',
      cells: []
    }
  }

  const fileName: string = match[1]
  return {
    indent,
    type: 'table',
    fileName,
    cells: components
      .map((blockComponent: BlockComponentType): string => blockComponent.text.substring(indent + 1))
      .map((block: string): Array<Array<LineNodeType>> => block
        .split('\t')
        .map((block: string): Array<LineNodeType> => convertToLineNodes(block, { nested: true, quoted: false }))
      )
  }
}
