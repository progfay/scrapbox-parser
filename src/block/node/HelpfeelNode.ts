import type { NodeParser } from '.'

const helpfeelRegExp = /^\? (.+)$/

export interface HelpfeelNode {
  type: 'helpfeel'
  text: string
}

const createHelpfeelNode = (text: string): HelpfeelNode => ({
  type: 'helpfeel',
  text
})

export const HelpfeelNodeParser: NodeParser = (text, { nested, quoted }, next) => {
  if (nested || quoted) return next()

  const helpfeelMatch = text.match(helpfeelRegExp)
  if (!helpfeelMatch) return next()

  const [, target] = helpfeelMatch
  return [createHelpfeelNode(target)]
}
