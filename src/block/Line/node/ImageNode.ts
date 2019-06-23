export type ImageNodeType = {
  type: 'image'
  src: string
  link: string
}

export const createImageNode = (src: string, link: string = '') => ({
  type: 'image',
  src,
  link
})
