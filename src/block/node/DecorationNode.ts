import { convertToLineNodes } from '.'

import type { NodeParser, LineNode } from '.'

const decorationRegExp = /^(.*?)\[([!"#%&'()*+,-./{|}<>_~]+) ((?:\[[^\]]+\]|[^\]])+)\](.*)$/

export type DecorationChar = '*' | '!' | '"' | '#' | '%' | '&' | '\'' | '(' | ')' | '+' | ',' | '-' | '.' | '/' | '{' | '|' | '}' | '<' | '>' | '_' | '~'
export type AsteriskDecorationChar = '*-1' | '*-2' | '*-3' | '*-4' | '*-5' | '*-6' | '*-7' | '*-8' | '*-9' | '*-10'
export type Decoration = Exclude<DecorationChar, '*'> | AsteriskDecorationChar
export interface DecorationNode {
  type: 'decoration'
  decos: Decoration[]
  nodes: LineNode[]
}

const createDecorationNode = (decoChars: string, nodes: LineNode[]): DecorationNode => {
  const decoSet = new Set<string>(decoChars)
  if (decoSet.has('*')) {
    const asteriskCount = decoChars.split('*').length - 1
    decoSet.delete('*')
    decoSet.add(`*-${Math.min(asteriskCount, 10)}` as DecorationChar)
  }

  return {
    type: 'decoration',
    decos: Array.from(decoSet) as Decoration[],
    nodes
  }
}

export const DecorationNodeParser: NodeParser = (text, { nested, quoted }, next) => {
  if (nested) return next()

  const decorationMatch = text.match(decorationRegExp)
  if (!decorationMatch) return next()

  const [, left, decoChars, target, right] = decorationMatch
  return [
    ...convertToLineNodes(left, { nested, quoted }),
    createDecorationNode(decoChars, convertToLineNodes(target, { nested: true, quoted })),
    ...convertToLineNodes(right, { nested, quoted })
  ]
}
