import { BlockComponentType } from './BlockComponent'
import { PackedBlockComponentType } from './PackedBlockComponent'

export type CodeBlockComponentType = {
  type: 'codeBlock'
  components: Array<BlockComponentType>
}

export type CodeBlockType = {
  indent: number
  type: 'codeBlock'
  fileName: string
  content: string
}

export const isCodeBlockComponent = (packedBlockComponent: PackedBlockComponentType): packedBlockComponent is CodeBlockComponentType => (
  packedBlockComponent.type === 'codeBlock'
)

export const convertToCodeBlock = (blockComponent: CodeBlockComponentType): CodeBlockType => {
  const { components } = blockComponent
  const head: BlockComponentType = components.shift() || { indent: 0, text: '' }
  const { indent, text } = head
  const match = text.match(/^\s*code:(.+)$/)
  if (!match) {
    return {
      indent: 0,
      type: 'codeBlock',
      fileName: '',
      content: ''
    }
  }

  const fileName: string = match[1]
  return {
    indent,
    type: 'codeBlock',
    fileName,
    content: components
      .map((blockComponent: BlockComponentType): string => blockComponent.text.substring(indent + 1))
      .join('\n')
  }
}
