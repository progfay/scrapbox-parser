import { PlainNodeType, LineComponentType, LineType } from './types'

const createPlainNode = (text: string): PlainNodeType => ({
  type: 'plain',
  text: text.trimLeft()
})

const parseToLines = (lineComponents: Array<LineComponentType>): Array<LineType> => {
  const lines: Array<LineType> = []

  while (lineComponents.length > 0) {
    const line = lineComponents.shift()
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
