import { createNodeParser } from './creator'

import { convertToLineNodes, LineNode } from '.'
import type { NodeCreator } from './creator'

const decorationRegExp = /\[[!"#%&'()*+,-./{|}<>_~]+ (?:\[[^\]]+\]|[^\]])+\]/

export type DecorationChar =
  | '*'
  | '!'
  | '"'
  | '#'
  | '%'
  | '&'
  | "'"
  | '('
  | ')'
  | '+'
  | ','
  | '-'
  | '.'
  | '/'
  | '{'
  | '|'
  | '}'
  | '<'
  | '>'
  | '_'
  | '~'
export type AsteriskDecorationChar =
  | '*-1'
  | '*-2'
  | '*-3'
  | '*-4'
  | '*-5'
  | '*-6'
  | '*-7'
  | '*-8'
  | '*-9'
  | '*-10'
export type Decoration = Exclude<DecorationChar, '*'> | AsteriskDecorationChar
export interface DecorationNode {
  type: 'decoration'
  decos: Decoration[]
  nodes: LineNode[]
}

const createDecorationNode: NodeCreator<DecorationNode> = (target, opts) => {
  const separatorIndex = target.indexOf(' ')
  const decoChars = target.substring(1, separatorIndex)
  const text = target.substring(separatorIndex + 1, target.length - 1)

  const decoSet = new Set<string>(decoChars)
  if (decoSet.has('*')) {
    const asteriskCount = decoChars.split('*').length - 1
    decoSet.delete('*')
    decoSet.add(`*-${Math.min(asteriskCount, 10)}` as DecorationChar)
  }

  return {
    type: 'decoration',
    decos: Array.from(decoSet) as Decoration[],
    nodes: convertToLineNodes(text, { ...opts, nested: true })
  }
}

export const DecorationNodeParser = createNodeParser(createDecorationNode, {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [decorationRegExp]
})
