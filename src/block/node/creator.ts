import { convertToLineNodes } from '.'

import type { LineNode, NodeParser, NodeParserOption } from '.'

export type NodeCreator<T extends LineNode> = (target: string, opts: NodeParserOption) => T | T[]

type NodeParserCreator<T extends LineNode> = (
  nodeCreator: NodeCreator<T>,
  opts: { parseOnNested: boolean; parseOnQuoted: boolean; patterns: RegExp[] }
) => NodeParser

export const createNodeParser: NodeParserCreator<LineNode> = (
  nodeCreator,
  { parseOnNested, parseOnQuoted, patterns }
) => {
  return (text, opts, next) => {
    if (!parseOnNested && opts.nested) return next?.() ?? []
    if (!parseOnQuoted && opts.quoted) return next?.() ?? []

    for (const pattern of patterns) {
      const match = pattern.exec(text)
      if (match === null) continue

      const left = text.substring(0, match.index)
      const right = text.substring(match.index + match[0].length)

      const node = nodeCreator(match[0], opts)
      return [
        ...convertToLineNodes(left, opts),
        ...(Array.isArray(node) ? node : [node]),
        ...convertToLineNodes(right, opts)
      ]
    }

    return next?.() ?? []
  }
}
