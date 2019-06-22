import { LineType, LineComponentType, convertToLineComponents } from './line'
import parseToLines from './parseToLines'

type PageType = {
  title: string
  lines: Array<LineType>
}

const parse = (input: string): PageType => {
  const lineComponents: Array<LineComponentType> = convertToLineComponents(input.trim())

  const firstLine: LineComponentType = lineComponents.shift() || { indent: 0, text: '' }
  const title: string = firstLine.text || 'Untitled'
  const lines: Array<LineType> = parseToLines(lineComponents)

  return { title, lines }
}

export default parse
