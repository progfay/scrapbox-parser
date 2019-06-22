import { LineType, LineComponentType } from './line'
import { createPlainNode } from './node/PlainNode'
import { createCodeBlockNode } from './node/CodeBlockNode'
import { createTableNode } from './node/TableNode'

const parseToLines = (lineComponents: Array<LineComponentType>): Array<LineType> => {
  const lines: Array<LineType> = []
  let codeBlockLineComponents: Array<LineComponentType> = []
  let tableLineComponents: Array<LineComponentType> = []

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
            nodes: [createCodeBlockNode(codeBlockLineComponents)]
          }
        )
        codeBlockLineComponents = []
      }
    }

    if (tableLineComponents.length > 0) {
      if (indent > tableLineComponents[0].indent) {
        tableLineComponents.push(line)
        continue
      } else {
        lines.push(
          {
            indent,
            nodes: [createTableNode(tableLineComponents)]
          }
        )
        tableLineComponents = []
      }
    }

    if (text.match(/^\s*code:(.+)$/)) {
      codeBlockLineComponents.push(line)
      continue
    }

    if (text.match(/^\s*table:(.+)$/)) {
      tableLineComponents.push(line)
      continue
    }

    lines.push(
      {
        indent,
        nodes: [createPlainNode(text)]
      }
    )
  }

  if (codeBlockLineComponents.length > 0) {
    lines.push(
      {
        indent: codeBlockLineComponents[0].indent,
        nodes: [createCodeBlockNode(codeBlockLineComponents)]
      }
    )
  }

  if (tableLineComponents.length > 0) {
    lines.push(
      {
        indent: tableLineComponents[0].indent,
        nodes: [createTableNode(tableLineComponents)]
      }
    )
  }

  return lines
}

export default parseToLines
