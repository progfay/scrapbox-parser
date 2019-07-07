import { BlockComponentType } from './BlockComponent'
import { PackedBlockComponentType } from './PackedBlockComponent'

export type CodeBlockComponentType = {
  type: 'codeBlock'
  components: BlockComponentType[]
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
  const [head, ...body] = components
  const { indent, text } = head
  const fileName: string = text.replace(/^\s*code:/, '')

  return {
    indent,
    type: 'codeBlock',
    fileName,
    content: body
      .map((component: BlockComponentType): string => component.text.substring(indent + 1))
      .join('\n')
  }
}
