import { convertToLineNodes } from '.'

import type { NodeParser } from '.'

const codeRegExp = /^(.*?)`(.*?)`(.*)$/
const codeCommandRegExp = /^(\$ .+)$/

export interface CodeNode {
  type: 'code'
  text: string
}

const createCodeNode = (text: string): CodeNode => ({
  type: 'code',
  text
})

export const CodeNodeParser: NodeParser = (text, { nested, quoted }, next) => {
  if (nested) return next()

  const codeCommandMatch = text.match(codeCommandRegExp)
  if (codeCommandMatch !== null) {
    const [, target] = codeCommandMatch
    return [createCodeNode(target)]
  }

  const codeMatch = text.match(codeRegExp)
  if (codeMatch !== null) {
    const [, left, target, right] = codeMatch
    return [
      ...convertToLineNodes(left, { nested, quoted }),
      createCodeNode(target),
      ...convertToLineNodes(right, { nested, quoted })
    ]
  }

  return next()
}
