import { createNodeParser } from './creator'

import type { CommandLineNode } from './type'
import type { NodeCreator } from './creator'

const commandLineRegExp = /^[$%] .+$/

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
