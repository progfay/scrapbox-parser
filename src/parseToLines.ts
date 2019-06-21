import { PlainNodeType, _LineType, LineType } from './types'

const createPlainNode = (text: string): PlainNodeType => ({
  type: 'plain',
  text: text.trim()
})

const parseToLines = (_lines: Array<_LineType>): Array<LineType> => {
  const lines: Array<LineType> = []

  while (_lines.length > 0) {
    const line = _lines.shift()
    if (!line) continue
    const { indent, text } = line
    lines.push(
      {
        indent,
        nodes: [ createPlainNode(text) ]
      }
    )
  }

  return lines
}

export default parseToLines
