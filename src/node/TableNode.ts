import { BlockComponentType } from '../block'

export type TableNodeType = {
  type: 'table'
  fileName: string
  cells: Array<Array<string>>
}

export const createTableNode = (blockComponents: Array<BlockComponentType>): TableNodeType => {
  const head: BlockComponentType = blockComponents.shift() || { indent: 0, text: '' }
  const { indent, text } = head
  const match = text.match(/^\s*table:(.+)$/)
  if (!match) {
    return {
      type: 'table',
      fileName: '',
      cells: []
    }
  }

  const fileName: string = match[1]
  return {
    type: 'table',
    fileName,
    cells: blockComponents
      .map((blockComponent: BlockComponentType): string => blockComponent.text.substring(indent + 1))
      .map((block: string): Array<string> => block.split('\t'))
  }
}
