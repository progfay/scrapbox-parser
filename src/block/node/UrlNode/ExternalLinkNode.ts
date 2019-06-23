export type ExternalLinkNodeType = {
  type: 'link'
  pathType: 'absolute'
  href: string
  content: string
}

export const createExternalLinkNode = (href: string, content: string): ExternalLinkNodeType => ({
  type: 'link',
  pathType: 'absolute',
  href,
  content
})
