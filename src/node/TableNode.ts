import { LineComponentType } from '../line'

export type TableNodeType = {
  type: 'table'
  fileName: string
  cells: Array<Array<string>>
}

export const createTableNode = (lineComponents: Array<LineComponentType>): TableNodeType => {
  const head: LineComponentType = lineComponents.shift() || { indent: 0, text: '' }
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
    cells: lineComponents
      .map((lineComponent: LineComponentType): string => lineComponent.text.substring(indent + 1))
      .map((line: string): Array<string> => line.split('\t'))
  }
}
