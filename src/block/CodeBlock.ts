import type { BlockComponent } from './BlockComponent'

export interface CodeBlockPack {
  type: 'codeBlock'
  components: BlockComponent[]
}

export interface CodeBlock {
  indent: number
  type: 'codeBlock'
  fileName: string
  content: string
}

export const convertToCodeBlock = (pack: CodeBlockPack): CodeBlock => {
  const { components } = pack
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
