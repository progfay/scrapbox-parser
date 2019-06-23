import { ExternalLinkNodeType, createExternalLinkNodeType } from './ExternalLinkNode'

export const urlRegExp = /^(.*?)\[(?<href>https?:\/\/[^\s\]]+)(?<content>)\](.*)$/
export const leftUrlRegExp = /^(.*?)\[(?<href>https?:\/\/[^\s\]]+)\s+(?<content>[^\]]*[^\s])\](.*)$/
export const rightUrlRegExp = /^(.*?)\[(?<content>[^\]]*[^\s])\s+(?<href>https?:\/\/[^\s\]]+)\](.*)$/

export type UrlNodeType = ExternalLinkNodeType

type UrlMatchType = {
  groups: {
    href: string
    content: string
  }
}

export const isUrlMatch = (obj: any): obj is UrlMatchType => (
  obj && obj.groups && obj.groups.href
)

export const createUrlNode = (href: string, content: string): UrlNodeType => {
  return createExternalLinkNodeType(href, content)
}
