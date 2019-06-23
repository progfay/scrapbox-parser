export const urlRegExp = /^(.*?)(https?:\/\/[^\s\]]+)(.*)$/

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

const linkRegExp = /^(?<href>https?:\/\/[^\s\]]+)$/
const leftLinkRegExp = /^(?<href>https?:\/\/[^\s\]]+)\s+(?<content>[^\]]*[^\s])$/
const rightLinkRegExp = /^(?<content>[^\]]*[^\s])\s+(?<href>https?:\/\/[^\s\]]+)$/
const rootLinkRegExp = /^(?<href>\/[^\]]+)$/

type LinkMatchType = {
  groups: {
    href: string
    content?: string
  }
}

const isLinkMatch = (obj: any): obj is LinkMatchType => (
  obj && obj.groups && obj.groups.href
)

export const createLinkNode = (text: string): LinkNodeType => {
  const absoluteLinkMatch = text.match(linkRegExp) ||
                            text.match(leftLinkRegExp) ||
                            text.match(rightLinkRegExp)
  if (isLinkMatch(absoluteLinkMatch)) {
    const { href, content = '' } = absoluteLinkMatch.groups
    return {
      type: 'link',
      pathType: 'absolute',
      href,
      content
    }
  }

  const rootLinkMatch = text.match(rootLinkRegExp)
  if (isLinkMatch(rootLinkMatch)) {
    const { href } = rootLinkMatch.groups
    return {
      type: 'link',
      pathType: 'root',
      href
    }
  }

  return {
    type: 'link',
    pathType: 'relative',
    href: text
  }
}
