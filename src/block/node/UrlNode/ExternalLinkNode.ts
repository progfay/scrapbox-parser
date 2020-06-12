export interface ExternalLinkNode {
  type: 'link'
  pathType: 'absolute'
  href: string
  content: string
}

export const createExternalLinkNode = (href: string, content: string): ExternalLinkNode => ({
  type: 'link',
  pathType: 'absolute',
  href,
  content
})
