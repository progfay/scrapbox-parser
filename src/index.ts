import { PageType, LineType } from './types'

const parse = (input: string): PageType => {
  const _lines: Array<string> = input.trim().split('\n')
  const title: string = _lines.shift() || 'Untitled'
  const lines: LineType[] = _lines.map((line: string): LineType => {
    const indentMatcher = line.match(/^\s*/)
    const indent: number = indentMatcher ? indentMatcher[0].length : 0
    return {
      indent,
      nodes: [
        {
          type: 'plain',
          text: line.trim()
        }
      ]
    }
  })
  return { title, lines }
}

export default parse
