import { createNodeParser } from './creator'

import type { NodeCreator } from './creator'

const helpfeelRegExp = /^\? .+$/

export interface HelpfeelNode {
  type: 'helpfeel'
  text: string
}

const createHelpfeelNode: NodeCreator<HelpfeelNode> = target => ({
  type: 'helpfeel',
  text: target.substring(2)
})

export const HelpfeelNodeParser = createNodeParser(createHelpfeelNode, {
  parseOnNested: false,
  parseOnQuoted: false,
  patterns: [helpfeelRegExp]
})
