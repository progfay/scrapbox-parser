export const internalLinkRegExp = /^(.*?)\[(\/?[^[\]]+)\](.*)$/

export type InternalLinkNodeType = {
  type: 'link'
  pathType: 'root' | 'relative'
  href: string
}

export const createInternalLinkNode = (href: string): InternalLinkNodeType => ({
  type: 'link',
  pathType: /^\/.*$/.test(href) ? 'root' : 'relative',
  href
})
