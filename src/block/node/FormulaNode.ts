import { NodeParserType, convertToLineNodes } from '.'

const formulaWithTailHalfSpaceRegExp = /^(.*?)\[\$ (.+?) \](.*)$/
const formulaRegExp = /^(.*?)\[\$ ([^\]]+)\](.*)$/

export type FormulaNodeType = {
  type: 'formula'
  formula: string
}

const createFormulaNode = (formula: string): FormulaNodeType => ({
  type: 'formula',
  formula
})

export const FormulaNodeParser: NodeParserType = (text, { nested, quoted }, next) => {
  if (nested) return next()

  const hashTagMatch = text.match(formulaWithTailHalfSpaceRegExp) || text.match(formulaRegExp)
  if (!hashTagMatch) return next()

  const [, left, target, right] = hashTagMatch
  return [
    ...convertToLineNodes(left, { nested, quoted }),
    createFormulaNode(target),
    ...convertToLineNodes(right, { nested, quoted })
  ]
}
