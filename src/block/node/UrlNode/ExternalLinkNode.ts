export type ExternalLinkNodeType = {
  readonly type: 'link'
  readonly pathType: 'absolute'
  readonly href: string
  readonly content: string
}

export const createExternalLinkNode = (href: string, content: string): ExternalLinkNodeType => ({
  type: 'link',
  pathType: 'absolute',
  href,
  content
})
