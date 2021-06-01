import type { Row } from './Row'

export interface CodeBlockPack {
  type: 'codeBlock'
  rows: Row[]
}

export interface CodeBlock {
  indent: number
  type: 'codeBlock'
  fileName: string
  lang: string
  content: string
}

export const convertToCodeBlock = (pack: CodeBlockPack): CodeBlock => {
  const {
    rows: [head, ...body]
  } = pack
  const { indent = 0, text = '' } = head ?? {}
  const fileName: string = text.replace(/^\s*code:/, '').replace(/\([^()]+\)$/, '')
  const lang: string = text.match(/\(([^()]+)\)$/)?.[1] ?? fileName.split('.').pop() ?? fileName

  return {
    indent,
    type: 'codeBlock',
    fileName,
    lang,
    content: body.map((row: Row): string => row.text.substring(indent + 1)).join('\n')
  }
}
