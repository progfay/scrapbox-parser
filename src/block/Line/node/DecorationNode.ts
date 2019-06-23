import { LineNodeType } from '.'

export type DecorationCharType = '*' | '!' | '"' | '#' | '%' | '&' | '\'' | '(' | ')' | '+' | ',' | '-' | '.' | '/' | '{' | '|' | '}' | '<' | '>' | '_' | '~'
export type AsteriskDecorationCharType = '*-1' | '*-2' | '*-3' | '*-4' | '*-5' | '*-6' | '*-7' | '*-8' | '*-9' | '*-10'
export type DecorationType = Exclude<DecorationCharType, '*'> | AsteriskDecorationCharType

export const decorationRegExp = /^(.*?)\[([*!"#%&'()+,\-./{|}<>_~]+) (.+?)\](.*)$/

export type DecorationNodeType = {
  type: 'decoration'
  decos: Array<DecorationType>
  nodes: Array<LineNodeType>
}

export const createDecorationNode = (decoChars: string, nodes: Array<LineNodeType>): DecorationNodeType => {
  const decoSet = new Set<string>(decoChars)
  if (decoSet.has('*')) {
    const asteriskCount = decoChars.split('*').length - 1
    decoSet.delete('*')
    decoSet.add(`*-${Math.min(asteriskCount, 10)}` as DecorationCharType)
  }

  return {
    type: 'decoration',
    decos: Array.from(decoSet) as Array<DecorationType>,
    nodes
  }
}
