import { createNodeParser } from './creator'

import type { FormulaNode } from './type'
import type { NodeCreator } from './creator'

const formulaWithTailHalfSpaceRegExp = /\[\$ .+? \]/
const formulaRegExp = /\[\$ [^\]]+\]/

const createFormulaNode: NodeCreator<FormulaNode> = target => {
  target = target.substring(3, target.length - 1)
  if (target.endsWith(' ')) target = target.substring(0, target.length - 1)

  return {
    type: 'formula',
    formula: target
  }
}

export const FormulaNodeParser = createNodeParser(createFormulaNode, {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [formulaWithTailHalfSpaceRegExp, formulaRegExp]
})
