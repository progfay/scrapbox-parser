import { PlainNodeType, _LineType, LineType } from './types'

const createPlainNode = (text: string): PlainNodeType => ({
  type: 'plain',
  text
})

const parseToLines = (_lines: Array<_LineType>): Array<LineType> => {
  const lines: Array<LineType> = []

  while (_lines.length > 0) {
    const line = _lines.shift()
    if (!line) continue
    const { indent, content } = line
    lines.push(
      {
        indent,
        nodes: [ createPlainNode(content) ]
      }
    )
  }

  return lines
}

export default parseToLines
