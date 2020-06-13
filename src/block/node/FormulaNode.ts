import { convertToLineNodes } from '.'

import type { NodeParser } from '.'

const formulaWithTailHalfSpaceRegExp = /^(.*?)\[\$ (.+?) \](.*)$/
const formulaRegExp = /^(.*?)\[\$ ([^\]]+)\](.*)$/

export interface FormulaNode {
  type: 'formula'
  formula: string
}

const createFormulaNode = (formula: string): FormulaNode => ({
  type: 'formula',
  formula
})

export const FormulaNodeParser: NodeParser = (
  text,
  { nested, quoted },
  next
) => {
  if (nested) return next()

  const hashTagMatch =
    text.match(formulaWithTailHalfSpaceRegExp) ?? text.match(formulaRegExp)
  if (hashTagMatch === null) return next()

  const [, left, target, right] = hashTagMatch
  return [
    ...convertToLineNodes(left, { nested, quoted }),
    createFormulaNode(target),
    ...convertToLineNodes(right, { nested, quoted })
  ]
}
