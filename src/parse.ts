import { PageType, _LineType, LineType } from './types'
import parseToLines from './parseToLines'

const parse = (input: string): PageType => {
  const _lines: Array<_LineType> = input
    .trim()
    .split('\n')
    .map((_line: string): _LineType => {
      const lineMatcher = _line.match(/^\s*/)
      const indent: number = lineMatcher ? lineMatcher[0].length : 0
      return { indent, text: _line }
    })

  const firstLine: _LineType = _lines.shift() || { indent: 0, text: '' }
  const title: string = firstLine.text || 'Untitled'
  const lines: Array<LineType> = parseToLines(_lines)

  return { title, lines }
}

export default parse
