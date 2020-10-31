import { createNodeParser } from './creator'

import type { FormulaNode } from './type'
import type { NodeCreator } from './creator'

const formulaWithTailHalfSpaceRegExp = /\[\$ .+? \]/
const formulaRegExp = /\[\$ [^\]]+\]/

const createFormulaNode: NodeCreator<FormulaNode> = raw => ({
  type: 'formula',
  raw,
  formula: raw.substring(3, raw.length - (raw.endsWith(' ]') ? 2 : 1))
})

export const FormulaNodeParser = createNodeParser(createFormulaNode, {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [formulaWithTailHalfSpaceRegExp, formulaRegExp]
})
