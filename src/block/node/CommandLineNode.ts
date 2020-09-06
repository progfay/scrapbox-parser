import { createNodeParser } from './creator'

import type { NodeCreator } from './creator'

const commandLineRegExp = /^[$%] .+$/

export interface CommandLineNode {
  type: 'commandLine'
  symbol: string
  text: string
}

const createCommandLineNode: NodeCreator<CommandLineNode> = (target: string) => {
  const symbol = target[0]
  const text = target.substring(2)

  return {
    type: 'commandLine',
    symbol,
    text
  }
}

export const CommandLineNodeParser = createNodeParser(createCommandLineNode, {
  parseOnNested: false,
  parseOnQuoted: false,
  patterns: [commandLineRegExp]
})
