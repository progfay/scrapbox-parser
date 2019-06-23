export type IconNodeType = {
  type: 'icon'
  pathType: 'root' | 'relative'
  path: string
}

export const createIconNode = (path: string): IconNodeType => ({
  type: 'icon',
  pathType: /^\//.test(path) ? 'root' : 'relative',
  path
})
