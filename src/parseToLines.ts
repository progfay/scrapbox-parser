import { LineType, LineComponentType } from './line'
import { createPlainNode } from './node/PlainNode'
import { createCodeBlockNode } from './node/CodeBlockNode'

const parseToLines = (lineComponents: Array<LineComponentType>): Array<LineType> => {
  const lines: Array<LineType> = []
  let codeBlockLineComponents: Array<LineComponentType> = []

  while (lineComponents.length > 0) {
    const line = lineComponents.shift()
    if (!line) continue
    const { indent, text } = line

    if (codeBlockLineComponents.length > 0) {
      if (indent > codeBlockLineComponents[0].indent) {
        codeBlockLineComponents.push(line)
        continue
      } else {
        lines.push(
          {
            indent,
            nodes: [ createCodeBlockNode(codeBlockLineComponents) ]
          }
        )
        codeBlockLineComponents = []
      }
    }

    if (text.match(/^\s*code:(.+)$/)) {
      codeBlockLineComponents.push(line)
      continue
    }

    lines.push(
      {
        indent,
        nodes: [ createPlainNode(text) ]
      }
    )
  }

  if (codeBlockLineComponents.length > 0) {
    lines.push(
      {
        indent: codeBlockLineComponents[0].indent,
        nodes: [ createCodeBlockNode(codeBlockLineComponents) ]
      }
    )
  }

  return lines
}

export default parseToLines
