import type { Decoration } from './DecorationNode'

export interface QuoteNode {
  type: 'quote'
  nodes: Node[]
}

export interface HelpfeelNode {
  type: 'helpfeel'
  text: string
}

export interface StrongImageNode {
  type: 'strongImage'
  src: string
}

export interface StrongIconNode {
  type: 'strongIcon'
  pathType: 'root' | 'relative'
  path: string
}

export interface StrongNode {
  type: 'strong'
  nodes: Node[]
}

export interface FormulaNode {
  type: 'formula'
  formula: string
}

export interface DecorationNode {
  type: 'decoration'
  decos: Decoration[]
  nodes: Node[]
}

export interface CodeNode {
  type: 'code'
  text: string
}

export interface CommandLineNode {
  type: 'commandLine'
  symbol: string
  text: string
}

export interface BlankNode {
  type: 'blank'
  text: string
}

export interface ImageNode {
  type: 'image'
  src: string
  link: string
}

export interface LinkNode {
  type: 'link'
  pathType: 'absolute' | 'root' | 'relative'
  href: string
  content: string
}

export interface GoogleMapNode {
  type: 'googleMap'
  latitude: number
  longitude: number
  zoom: number
  place: string
  url: string
}

export interface IconNode {
  type: 'icon'
  pathType: 'root' | 'relative'
  path: string
}

export interface HashTagNode {
  type: 'hashTag'
  href: string
}

export interface PlainNode {
  type: 'plain'
  text: string
}

export type Node =
  | QuoteNode
  | HelpfeelNode
  | StrongImageNode
  | StrongIconNode
  | StrongNode
  | FormulaNode
  | DecorationNode
  | CodeNode
  | CommandLineNode
  | BlankNode
  | ImageNode
  | LinkNode
  | GoogleMapNode
  | IconNode
  | HashTagNode
  | PlainNode
