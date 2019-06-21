import { PageType, LineType, NodeType } from './types'
import parseToNodes from './parseToNodes'

const parse = (input: string): PageType => {
  const _lines: Array<string> = input.trim().split('\n')
  const title: string = _lines.shift() || 'Untitled'
  const lines: LineType[] = []

  for (const line of _lines) {
    const indentMatcher = line.match(/^\s*/)
    const indent: number = indentMatcher ? indentMatcher[0].length : 0
    const nodes: Array<NodeType> = parseToNodes(line.trim(), indent)
    lines.push({ indent, nodes })
  }

  return { title, lines }
}

export default parse
