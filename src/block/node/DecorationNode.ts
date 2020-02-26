import { NodeParserType, LineNodeType, convertToLineNodes } from '.'

const decorationRegExp = /^(.*?)\[([!"#%&'()*+,-./{|}<>_~]+) ((?:\[[^\]]+\]|[^\]])+)\](.*)$/

export type DecorationCharType = '*' | '!' | '"' | '#' | '%' | '&' | '\'' | '(' | ')' | '+' | ',' | '-' | '.' | '/' | '{' | '|' | '}' | '<' | '>' | '_' | '~'
export type AsteriskDecorationCharType = '*-1' | '*-2' | '*-3' | '*-4' | '*-5' | '*-6' | '*-7' | '*-8' | '*-9' | '*-10'
export type DecorationType = Exclude<DecorationCharType, '*'> | AsteriskDecorationCharType
export type DecorationNodeType = {
  readonly type: 'decoration'
  readonly decos: ReadonlyArray<DecorationType>
  readonly nodes: ReadonlyArray<LineNodeType>
}

const createDecorationNode = (decoChars: string, nodes: LineNodeType[]): DecorationNodeType => {
  const decoSet = new Set<string>(decoChars)
  if (decoSet.has('*')) {
    const asteriskCount = decoChars.split('*').length - 1
    decoSet.delete('*')
    decoSet.add(`*-${Math.min(asteriskCount, 10)}` as DecorationCharType)
  }

  return {
    type: 'decoration',
    decos: Array.from(decoSet) as DecorationType[],
    nodes
  }
}

export const DecorationNodeParser: NodeParserType = (text, { nested, quoted }, next) => {
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
