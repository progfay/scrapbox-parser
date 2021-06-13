import type { Decoration } from "./DecorationNode";

interface BaseNode {
  raw: string;
}

export interface QuoteNode extends BaseNode {
  type: "quote";
  nodes: Node[];
}

export interface HelpfeelNode extends BaseNode {
  type: "helpfeel";
  text: string;
}

export interface StrongImageNode extends BaseNode {
  type: "strongImage";
  src: string;
}

export interface StrongIconNode extends BaseNode {
  type: "strongIcon";
  pathType: "root" | "relative";
  path: string;
}

export interface StrongNode extends BaseNode {
  type: "strong";
  nodes: Node[];
}

export interface FormulaNode extends BaseNode {
  type: "formula";
  formula: string;
}

export interface DecorationNode extends BaseNode {
  type: "decoration";
  rawDecos: string;
  decos: Decoration[];
  nodes: Node[];
}

export interface CodeNode extends BaseNode {
  type: "code";
  text: string;
}

export interface CommandLineNode extends BaseNode {
  type: "commandLine";
  symbol: string;
  text: string;
}

export interface BlankNode extends BaseNode {
  type: "blank";
  text: string;
}

export interface ImageNode extends BaseNode {
  type: "image";
  src: string;
  link: string;
}

export interface LinkNode extends BaseNode {
  type: "link";
  pathType: "absolute" | "root" | "relative";
  href: string;
  content: string;
}

export interface GoogleMapNode extends BaseNode {
  type: "googleMap";
  latitude: number;
  longitude: number;
  zoom: number;
  place: string;
  url: string;
}

export interface IconNode extends BaseNode {
  type: "icon";
  pathType: "root" | "relative";
  path: string;
}

export interface HashTagNode extends BaseNode {
  type: "hashTag";
  href: string;
}

export interface PlainNode extends BaseNode {
  type: "plain";
  text: string;
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
  | PlainNode;
