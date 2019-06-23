import { ExternalLinkNodeType, createExternalLinkNode } from './ExternalLinkNode'
import { ImageNodeType, createImageNode } from './ImageNode'

export const urlRegExp = /^(.*?)\[(?<href>https?:\/\/[^\s\]]+)(?<content>)\](.*)$/
export const leftUrlRegExp = /^(.*?)\[(?<href>https?:\/\/[^\s\]]+)\s+(?<content>[^\]]*[^\s])\](.*)$/
export const rightUrlRegExp = /^(.*?)\[(?<content>[^\]]*[^\s])\s+(?<href>https?:\/\/[^\s\]]+)\](.*)$/

export type UrlNodeType = ExternalLinkNodeType | ImageNodeType

type UrlMatchType = {
  groups: {
    href: string
    content: string
  }
}

export const isUrlMatch = (obj: any): obj is UrlMatchType => (
  obj && obj.groups && obj.groups.href
)

const isUrl = (text: string): boolean => (
  /^https?:\/\/[^\s\]]+$/.test(text)
)

const isImageUrl = (text: string): boolean => (
  /^https?:\/\/[^\s\]]+\.(png|jpe?g|gif|svg)$/i.test(text) || isGyazoImageUrl(text)
)

const isGyazoImageUrl = (text: string): boolean => (
  /^https?:\/\/([0-9a-z-]\.)?gyazo\.com\/[0-9a-f]{32}(\/raw)?$/.test(text)
)

export const createUrlNode = (href: string, content: string = ''): UrlNodeType => {
  if (content === '') return isImageUrl(href) ? createImageNode(href, content) : createExternalLinkNode(href, content)
  if (content && !isUrl(content)) return createExternalLinkNode(href, content)
  if (isGyazoImageUrl(content)) return createImageNode(content, href)
  if (isGyazoImageUrl(href)) return createImageNode(href, content)
  if (isImageUrl(content)) return createImageNode(content, href)
  return createImageNode(href, content)
}
