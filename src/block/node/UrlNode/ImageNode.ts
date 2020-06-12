export interface ImageNode {
  type: 'image'
  src: string
  link: string
}

export const createImageNode = (src: string, link: string): ImageNode => {
  if (/^https?:\/\/([0-9a-z-]\.)?gyazo\.com\/[0-9a-f]{32}$/.test(src)) {
    src = src + '/thumb/1000'
  }

  return {
    type: 'image',
    src,
    link
  }
}
