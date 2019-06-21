import { PageType, _LineType, LineType } from './types'
import parseToLines from './parseToLines'

const parse = (input: string): PageType => {
  const _lines: Array<_LineType> = input
    .trim()
    .split('\n')
    .map((_line: string): _LineType => {
      const lineMatcher = _line.match(/^(\s*)(.*)$/)
      const indent: number = lineMatcher ? lineMatcher[1].length : 0
      const content: string = lineMatcher ? lineMatcher[2] : ''
      return { indent, content }
    })

  const firstLine: _LineType = _lines.shift() || { indent: 0, content: '' }
  const title: string = firstLine.content || 'Untitled'
  const lines: Array<LineType> = parseToLines(_lines)

  return { title, lines }
}

export default parse
