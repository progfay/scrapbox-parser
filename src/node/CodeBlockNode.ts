import { BlockComponentType } from '../block'

export type CodeBlockNodeType = {
  type: 'codeBlock'
  fileName: string
  content: string
}

export const createCodeBlockNode = (blockComponents: Array<BlockComponentType>): CodeBlockNodeType => {
  const head: BlockComponentType = blockComponents.shift() || { indent: 0, text: '' }
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
    content: blockComponents
      .map((blockComponent: BlockComponentType): string => blockComponent.text.substring(indent + 1))
      .join('\n')
  }
}
