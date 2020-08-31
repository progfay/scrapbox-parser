import { createNodeParser } from './creator'

import type { NodeCreator } from './creator'

const hrefFirstUrlRegExp = /^(.*?)(\[https?:\/\/[^\s\]]+(?:\s+[^\]]*[^\s])?\])(.*)$/
const contentFirstUrlRegExp = /^(.*?)((?:\[[^\]]*[^\s]\s+)?https?:\/\/[^\s\]]+\])(.*)$/
const httpRegExp = /^(.*?\s)?(https?:\/\/[^\s\]]+)(.*)$/

const isUrl = (text: string): boolean => /^https?:\/\/[^\s\]]+$/.test(text)

const isImageUrl = (text: string): boolean =>
  /^https?:\/\/[^\s\]]+\.(png|jpe?g|gif|svg)(\?[^\]\s]+)?$/i.test(text) || isGyazoImageUrl(text)

const isGyazoImageUrl = (text: string): boolean =>
  /^https?:\/\/([0-9a-z-]\.)?gyazo\.com\/[0-9a-f]{32}(\/raw)?$/.test(text)

export interface ExternalLinkNode {
  type: 'link'
  pathType: 'absolute'
  href: string
  content: string
}
export interface ImageNode {
  type: 'image'
  src: string
  link: string
}
export type UrlNode = ExternalLinkNode | ImageNode

const createUrlNode: NodeCreator<UrlNode> = target => {
  if (target.startsWith('[') && target.endsWith(']')) {
    target = target.substring(1, target.length - 1)
  }

  const isHrefFirst = /^https?:\/\/[^\s\]]/.test(target)
  const match =
    target.match(
      isHrefFirst
        ? /^(https?:\/\/[^\s\]]+)\s+([^\]]*[^\s])$/
        : /^([^\]]*[^\s])\s+(https?:\/\/[^\s\]]+)$/
    ) ?? []
  const href = match[isHrefFirst ? 1 : 2] ?? target
  const content = match[isHrefFirst ? 2 : 1] ?? ''

  if (!(isUrl(content) && isImageUrl(content)) && !isImageUrl(href)) {
    return {
      type: 'link',
      pathType: 'absolute',
      href,
      content
    }
  }

  const isContentImageUrl = isImageUrl(content)
  const src = isContentImageUrl ? content : href
  const link = isContentImageUrl ? href : content

  return {
    type: 'image',
    src: /^https?:\/\/([0-9a-z-]\.)?gyazo\.com\/[0-9a-f]{32}$/.test(src)
      ? `${src}/thumb/1000`
      : src,
    link
  }
}

export const UrlNodeParser = createNodeParser(createUrlNode, {
  parseOnNested: true,
  parseOnQuoted: true,
  patterns: [hrefFirstUrlRegExp, contentFirstUrlRegExp, httpRegExp]
})
