import { PlainNodeType, _LineType, LineType } from './types'

const createPlainNode = (text: string): PlainNodeType => ({
  type: 'plain',
  text
})

const parseToLines = (_lines: Array<_LineType>): Array<LineType> => {
  return _lines.map((_line: _LineType): LineType => ({
    indent: _line.indent,
    nodes: [ createPlainNode(_line.content) ]
  }))
}

export default parseToLines
