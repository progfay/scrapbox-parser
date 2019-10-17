import { ParserType } from '.'

const helpfeelRegExp = /^\? (.+)$/

export type HelpfeelNodeType = {
  type: 'helpfeel'
  text: string
}

const createHelpfeelNode = (text: string): HelpfeelNodeType => ({
  type: 'helpfeel',
  text
})

export const HelpfeelNodeParser: ParserType = (text, { nested, quoted }, next) => {
  if (nested || quoted) return next()

  const helpfeelMatch = text.match(helpfeelRegExp)
  if (!helpfeelMatch) return next()

  const [, target] = helpfeelMatch
  return [ createHelpfeelNode(target) ]
}
