import { PageType, LineComponentType, LineType } from './types'
import convertToLineComponents from './convertToLineComponents'
import parseToLines from './parseToLines'

const parse = (input: string): PageType => {
  const lineComponents: Array<LineComponentType> = input.trim()

  const firstLine: LineComponentType = lineComponents.shift() || { indent: 0, text: '' }
  const title: string = firstLine.text || 'Untitled'
  const lines: Array<LineType> = parseToLines(lineComponents)

  return { title, lines }
}

export default parse
