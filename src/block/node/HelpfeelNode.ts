import { createNodeParser } from './creator'

import type { HelpfeelNode } from './type'
import type { NodeCreator } from './creator'

const helpfeelRegExp = /^\? .+$/

const createHelpfeelNode: NodeCreator<HelpfeelNode> = raw => ({
  type: 'helpfeel',
  raw,
  text: raw.substring(2)
})

export const HelpfeelNodeParser = createNodeParser(createHelpfeelNode, {
  parseOnNested: false,
  parseOnQuoted: false,
  patterns: [helpfeelRegExp]
})
