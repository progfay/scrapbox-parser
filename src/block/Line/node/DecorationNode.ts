import { LineNodeType } from '.'

export type DecorationType = '*-1' | '*-2' | '*-3' | '*-4' | '*-5' | '*-6' | '*-7' | '*-8' | '*-9' | '*-10'
  | '!' | '"' | '#' | '%' | '&' | '\'' | '(' | ')' | ',' | '-' | '.' | '/' | '{' | '|' | '}' | '<' | '>' | '_' | '~'

export type DecorationNodeType = {
  type: 'decoration'
  decos: Array<DecorationType>
  nodes: Array<LineNodeType>
}

export const createDecorationNodeType = (decos: Array<DecorationType>, nodes: Array<LineNodeType>): DecorationNodeType => ({
  type: 'decoration',
  decos,
  nodes
})
