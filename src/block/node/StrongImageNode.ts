import { convertToLineNodes } from '.'

import type { NodeParser } from '.'

const strongImageRegExp = /^(?<left>.*?)\[\[(?<src>https?:\/\/[^\s\]]+\.(png|jpe?g|gif|svg))\]\](?<right>.*)$/i
const gyazoStrongImageRegExp = /^(?<left>.*?)\[\[(?<src>https?:\/\/([0-9a-z-]+\.)?gyazo\.com\/[0-9a-f]{32})\]\](?<right>.*)$/

export interface StrongImageNode {
  type: 'strongImage'
  src: string
}

interface StrongImageMatch {
  groups: {
    left: string
    right: string
    src: string
  }
}

const isStrongImageMatch = (obj: any): obj is StrongImageMatch =>
  obj?.groups?.src !== undefined

const createStrongImageNode = (src: string): StrongImageNode => ({
  type: 'strongImage',
  src
})

export const StrongImageNodeParser: NodeParser = (
  text,
  { nested, quoted },
  next
) => {
  if (nested) return next()

  const StrongImageMatch =
    text.match(strongImageRegExp) ?? text.match(gyazoStrongImageRegExp)
  if (!isStrongImageMatch(StrongImageMatch)) return next()

  const { left, src, right } = StrongImageMatch.groups
  const isGyazoImage = /^https?:\/\/([0-9a-z-]\.)?gyazo\.com\/[0-9a-f]{32}$/.test(
    src
  )

  return [
    ...convertToLineNodes(left, { nested, quoted }),
    createStrongImageNode(src + (isGyazoImage ? '/thumb/1000' : '')),
    ...convertToLineNodes(right, { nested, quoted })
  ]
}
