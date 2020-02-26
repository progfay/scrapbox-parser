import { NodeParserType } from '.'

const helpfeelRegExp = /^\? (.+)$/

export type HelpfeelNodeType = {
  readonly type: 'helpfeel'
  readonly text: string
}

const createHelpfeelNode = (text: string): HelpfeelNodeType => ({
  type: 'helpfeel',
  text
})

export const HelpfeelNodeParser: NodeParserType = (text, { nested, quoted }, next) => {
  if (nested || quoted) return next()

  const helpfeelMatch = text.match(helpfeelRegExp)
  if (!helpfeelMatch) return next()

  const [, target] = helpfeelMatch
  return [createHelpfeelNode(target)]
}
