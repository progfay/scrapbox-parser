export type PathType = 'absolute' | 'relative' | 'root'
export type DecorationType = '*-1' | '*-2' | '*-3' | '*-4' | '*-5' | '*-6' | '*-7' | '*-8' | '*-9' | '!' | '"' | '#' | '%' | '&' | '\'' | '(' | ')' | '*' | '+' | ',' | '-' | '.' | '/' | '{' | '|' | '}' | '<' | '>' | '_' | '~'
export type NodeType = ImageNodeType | LinkNodeType | DecorationNodeType | StrongNodeType | CodeNodeType | IconNodeType | QuoteNodeType

export type ImageNodeType = {
  type: 'image'
  src: string
  link: string
}

export type LinkNodeType = {
  type: 'link'
  pathType: PathType
  href: string
  content: string
}

export type DecorationNodeType = {
  type: 'decoration'
  deco: Array<DecorationType>
  nodes: Array<NodeType>
}

export type StrongNodeType = {
  type: 'strong'
  nodes: Array<NodeType>
}

export type CodeNodeType = {
  type: 'code'
  text: string
}

export type IconNodeType = {
  type: 'icon'
  pathType: PathType
  path: string
}

export type QuoteNodeType = {
  type: 'quote'
  nodes: Array<NodeType>
}
