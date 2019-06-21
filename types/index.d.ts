type PathType = 'absolute' | 'relative' | 'root'
type DecorationType = '*-1' | '*-2' | '*-3' | '*-4' | '*-5' | '*-6' | '*-7' | '*-8' | '*-9' | '!' | '"' | '#' | '%' | '&' | '\'' | '(' | ')' | '*' | '+' | ',' | '-' | '.' | '/' | '{' | '|' | '}' | '<' | '>' | '_' | '~'

type PlainNodeType = {
  type: 'plain'
  text: string
}

type ImageNodeType = {
  type: 'image'
  src: string
  link: string
 }

type LinkNodeType = {
  type:'link'
  pathType: PathType
  href: string
  content: string
}

type DecorationNodeType = {
  type: 'decoration'
  deco: Array<DecorationType>
  nodes: Array<NodeType>
}

type StrongNodeType = {
  type: 'strong'
  nodes: Array<NodeType>
}

type CodeNodeType = {
  type: 'code'
  text: string
}

type CodeBlockNodeType = {
  type: 'codeBlock'
  fileName: 'hello.js'
  content: 'function () {\n  alert(document.location.href)\n  console.log("hello")\n  // You can also write comments!\n}'
}
type IconNodeType = {
  type: 'icon'
  pathType: PathType
  path: '/icons/check'
}

type QuoteNodeType = {
  type: 'quote'
  nodes: Array<NodeType>
}

type TableNodeType = {
  type: 'table'
  fileName: string
  cells: Array<Array<string>>
 }

type NodeType = PlainNodeType | ImageNodeType | LinkNodeType | DecorationNodeType | StrongNodeType | CodeNodeType | CodeBlockNodeType | IconNodeType | QuoteNodeType | TableNodeType

type LineType = {
  indent: number
  nodes: Array<NodeType>
}

type PageType = {
  title: string
  Lines: Array<LineType>
}
