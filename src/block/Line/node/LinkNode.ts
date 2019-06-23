type AbsoluteLinkNodeType = {
  type: 'link'
  pathType: 'absolute'
  href: string
  content: string
}

type RootLinkNodeType = {
  type: 'link'
  pathType: 'root'
  href: string
}

type RelativeLinkNodeType = {
  type: 'link'
  pathType: 'relative'
  href: string
}

export type LinkNodeType = AbsoluteLinkNodeType | RootLinkNodeType | RelativeLinkNodeType

export const createLineNode = (href: string, content: string = ''): LinkNodeType => {
  if (/^https?:\/\//.test(href)) {
    return {
      type: 'link',
      pathType: 'absolute',
      href,
      content
    }
  }

  if (/^\//.test(href)) {
    return {
      type: 'link',
      pathType: 'root',
      href
    }
  }

  return {
    type: 'link',
    pathType: 'relative',
    href
  }
}
