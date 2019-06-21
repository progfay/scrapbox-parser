import { PlainNodeType, LineComponentType, LineType, CodeBlockNodeType } from './types'

const createPlainNode = (text: string): PlainNodeType => ({
  type: 'plain',
  text: text.trimLeft()
})

const createCodeBlockNode = (lineComponents: Array<LineComponentType>): CodeBlockNodeType => {
  const head: LineComponentType = lineComponents.shift() || { indent: 0, text: '' }
  const { indent, text } = head
  const match = text.match(/^\s*code:(.+)$/)
  if (!match) {
    return {
      type: 'codeBlock',
      fileName: '',
      content: ''
    }
  }

  const fileName: string = match[1]
  return {
    type: 'codeBlock',
    fileName,
    content: lineComponents
      .map((lineComponent: LineComponentType): string => lineComponent.text.substring(indent + 1))
      .join('\n')
  }
}

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
