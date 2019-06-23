export const urlRegExp = /^(.*?)\[(?<href>https?:\/\/[^\s\]]+)(?<content>)\](.*)$/
export const leftUrlRegExp = /^(.*?)\[(?<href>https?:\/\/[^\s\]]+)\s+(?<content>[^\]]*[^\s])\](.*)$/
export const rightUrlRegExp = /^(.*?)\[(?<content>[^\]]*[^\s])\s+(?<href>https?:\/\/[^\s\]]+)\](.*)$/

type ExternalLinkNodeType = {
  type: 'link'
  pathType: 'absolute'
  href: string
  content: string
}

export type UrlNodeType = ExternalLinkNodeType

type UrlMatchType = {
  groups: {
    href: string
    content?: string
  }
}

export const isUrlMatch = (obj: any): obj is UrlMatchType => (
  obj && obj.groups && obj.groups.href
)

export const createUrlNode = (href: string, content: string): UrlNodeType => {
  return {
    type: 'link',
    pathType: 'absolute',
    href,
    content
  }
}
