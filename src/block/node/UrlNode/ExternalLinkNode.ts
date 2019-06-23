export type ExternalLinkNodeType = {
  type: 'link'
  pathType: 'absolute'
  href: string
  content: string
}

export const createExternalLinkNodeType = (href: string, content: string): ExternalLinkNodeType => ({
  type: 'link',
  pathType: 'absolute',
  href,
  content
})
