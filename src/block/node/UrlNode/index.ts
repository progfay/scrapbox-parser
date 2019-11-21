import { ParserType, convertToLineNodes } from '../'
import { ExternalLinkNodeType, createExternalLinkNode } from './ExternalLinkNode'
import { ImageNodeType, createImageNode } from './ImageNode'

const urlRegExp = /^(?<left>.*?)\[(?<href>https?:\/\/[^\s\]]+)(?<content>)\](?<right>.*)$/
const leftUrlRegExp = /^(?<left>.*?)\[(?<href>https?:\/\/[^\s\]]+)\s+(?<content>[^\]]*[^\s])\](?<right>.*)$/
const rightUrlRegExp = /^(?<left>.*?)\[(?<content>[^\]]*[^\s])\s+(?<href>https?:\/\/[^\s\]]+)\](?<right>.*)$/
const httpRegExp = /^(?<left>.*?\s)?(?<href>https?:\/\/[^\s\]]+)(?<content>)(?<right>.*)$/

type UrlMatchType = {
  groups: {
    left: string
    right: string
    href: string
    content: string
  }
}

const isUrlMatch = (obj: any): obj is UrlMatchType => (
  obj && obj.groups && obj.groups.href
)

const isUrl = (text: string): boolean => (
  /^https?:\/\/[^\s\]]+$/.test(text)
)

const isImageUrl = (text: string): boolean => (
  /^https?:\/\/[^\s\]]+\.(png|jpe?g|gif|svg)(\?[^\]\s]+)?$/i.test(text) || isGyazoImageUrl(text)
)

const isGyazoImageUrl = (text: string): boolean => (
  /^https?:\/\/([0-9a-z-]\.)?gyazo\.com\/[0-9a-f]{32}(\/raw)?$/.test(text)
)

export type UrlNodeType = ExternalLinkNodeType | ImageNodeType

const createUrlNode = (href: string, content: string): UrlNodeType => {
  if (!(isUrl(content) && isImageUrl(content)) && !isImageUrl(href)) return createExternalLinkNode(href, content)
  if (isImageUrl(content)) [href, content] = [content, href]
  return createImageNode(href, content)
}

export const UrlNodeParser: ParserType = (text, { nested, quoted }, next) => {
  const UrlMatch = text.match(urlRegExp) ||
                   text.match(leftUrlRegExp) ||
                   text.match(rightUrlRegExp) ||
                   text.match(httpRegExp)
  if (!isUrlMatch(UrlMatch)) return next()

  const { left, href, content, right } = UrlMatch.groups
  return [
    ...convertToLineNodes(left, { nested, quoted }),
    createUrlNode(href, content),
    ...convertToLineNodes(right, { nested, quoted })
  ]
}
