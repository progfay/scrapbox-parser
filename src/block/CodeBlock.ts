import type { BlockComponent } from './BlockComponent'
import type { PackedBlockComponent } from './PackedBlockComponent'

export interface CodeBlockComponent {
  type: 'codeBlock'
  components: BlockComponent[]
}

export interface CodeBlock {
  indent: number
  type: 'codeBlock'
  fileName: string
  content: string
}

export const isCodeBlockComponent = (
  packedBlockComponent: PackedBlockComponent
): packedBlockComponent is CodeBlockComponent => packedBlockComponent.type === 'codeBlock'

export const convertToCodeBlock = (blockComponent: CodeBlockComponent): CodeBlock => {
  const { components } = blockComponent
  const [head, ...body] = components
  const { indent, text } = head
  const fileName: string = text.replace(/^\s*code:/, '')

  return {
    indent,
    type: 'codeBlock',
    fileName,
    content: body
      .map((component: BlockComponent): string => component.text.substring(indent + 1))
      .join('\n')
  }
}
