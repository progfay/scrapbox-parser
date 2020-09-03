import { createNodeParser } from './creator'

import type { NodeCreator } from './creator'

const commandLineRegExp = /^()([$%] .+)()$/

export interface CommandLineNode {
  type: 'commandLine'
  symbol: string
  text: string
}

const createCommandLineNode: NodeCreator<CommandLineNode> = (target: string) => {
  const match = target.match(/^([$%]) (.+)$/)
  if (match === null) return []
  const [, symbol, text] = match
  return {
    type: 'commandLine',
    symbol,
    text
  }
}

export const CommandLineNodeParser = createNodeParser(createCommandLineNode, {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [commandLineRegExp]
})
