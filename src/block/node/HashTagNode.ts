export const hashTagRegExp = /^(.+? )?#(\S+)(.*)?$/

export type HashTagNodeType = {
  type: 'hashTag'
  href: string
}

export const createHashTagNode = (href: string): HashTagNodeType => ({
  type: 'hashTag',
  href
})
