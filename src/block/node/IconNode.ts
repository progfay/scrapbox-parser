export const iconRegExp = /^(.*)\.icon(\*(\d+))?$/

export type IconNodeType = {
  type: 'icon'
  pathType: 'root' | 'relative'
  path: string
}

export const createIconNode = (path: string): IconNodeType | null => ({
  type: 'icon',
  pathType: /^\//.test(path) ? 'root' : 'relative',
  path
})
