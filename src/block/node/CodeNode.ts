import { createNodeParser } from './creator'

import type { CodeNode } from './type'
import type { NodeCreator } from './creator'

const codeRegExp = /`.*?`/

const createCodeNode: NodeCreator<CodeNode> = raw => ({
  type: 'code',
  raw,
  text: raw.substring(1, raw.length - 1)
})

export const CodeNodeParser = createNodeParser(createCodeNode, {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [codeRegExp]
})
