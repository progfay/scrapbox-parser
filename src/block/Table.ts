import { BlockComponentType } from './BlockComponent'
import { PackedBlockComponentType } from './PackedBlockComponent'
import { convertToLineNodes, LineNodeType } from './node'

export type TableComponentType = {
  readonly type: 'table'
  readonly components: BlockComponentType[]
}

export type TableType = {
  readonly indent: number
  readonly type: 'table'
  readonly fileName: string
  readonly cells: ReadonlyArray<ReadonlyArray<ReadonlyArray<LineNodeType>>>
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
