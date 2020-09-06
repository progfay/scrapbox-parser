import { createNodeParser } from './creator'

import type { NodeCreator } from './creator'

const srcFirstStrongImageRegExp = /\[https?:\/\/[^\s\]]+\.(?:png|jpe?g|gif|svg)(?:\?[^\]\s]+)?(?:\s+https?:\/\/[^\s\]]+)?\]/i
const linkFirstStrongImageRegExp = /\[https?:\/\/[^\s\]]+\s+https?:\/\/[^\s\]]+\.(?:png|jpe?g|gif|svg)(?:\?[^\]\s]+)?\]/i
const srcFirststrongGyazoImageRegExp = /\[https?:\/\/(?:[0-9a-z-]+\.)?gyazo\.com\/[0-9a-f]{32}(?:\/raw)?(?:\s+https?:\/\/[^\s\]]+)?\]/
const linkFirststrongGyazoImageRegExp = /\[https?:\/\/[^\s\]]+\s+https?:\/\/(?:[0-9a-z-]+\.)?gyazo\.com\/[0-9a-f]{32}(?:\/raw)?\]/

const isImageUrl = (text: string): boolean =>
  /^https?:\/\/[^\s\]]+\.(png|jpe?g|gif|svg)(\?[^\]\s]+)?$/i.test(text) || isGyazoImageUrl(text)

const isGyazoImageUrl = (text: string): boolean =>
  /^https?:\/\/([0-9a-z-]\.)?gyazo\.com\/[0-9a-f]{32}(\/raw)?$/.test(text)

export interface ImageNode {
  type: 'image'
  src: string
  link: string
}

const createImageNode: NodeCreator<ImageNode> = target => {
  const index = target.search(/\s/)
  // if (index === -1) index = target.length - 2
  const first = index !== -1 ? target.substring(1, index) : target.substring(1, target.length - 1)
  const second = index !== -1 ? target.substring(index, target.length - 1).trimLeft() : ''
  const [src, link] = isImageUrl(second) ? [second, first] : [first, second]

  return {
    type: 'image',
    src: /^https?:\/\/([0-9a-z-]\.)?gyazo\.com\/[0-9a-f]{32}$/.test(src)
      ? `${src}/thumb/1000`
      : src,
    link
  }
}

export const ImageNodeParser = createNodeParser(createImageNode, {
  parseOnNested: true,
  parseOnQuoted: true,
  patterns: [
    srcFirstStrongImageRegExp,
    linkFirstStrongImageRegExp,
    srcFirststrongGyazoImageRegExp,
    linkFirststrongGyazoImageRegExp
  ]
})
