import { LineComponentType } from '../line'

export type CodeBlockNodeType = {
  type: 'codeBlock'
  fileName: string
  content: string
}

export const createCodeBlockNode = (lineComponents: Array<LineComponentType>): CodeBlockNodeType => {
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
