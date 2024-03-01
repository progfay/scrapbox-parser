import type { Decoration } from "./DecorationNode";

interface BaseNode {
  raw: string;
}

/**
 * Scrapbox {@link https://scrapbox.io/help/Syntax#58348ae2651ee500008d67d8 | quote node} type
 */
export interface QuoteNode extends BaseNode {
  type: "quote";
  nodes: Node[];
}

/**
 * Scrapbox {@link https://scrapbox.io/help-jp/Helpfeel%E8%A8%98%E6%B3%95 | Helpfeel node} type
 */
export interface HelpfeelNode extends BaseNode {
  type: "helpfeel";
  text: string;
}

/**
 * Scrapbox {@link https://scrapbox.io/help-jp/%E3%81%9D%E3%81%AE%E4%BB%96%E3%81%AE%E6%9B%B8%E3%81%8D%E6%96%B9#5cfa1ea397c291000095c81e | strong image node} type
 */
export interface StrongImageNode extends BaseNode {
  type: "strongImage";
  src: string;
}

/**
 * Scrapbox {@link https://scrapbox.io/help/Icon#5ec273358ee92a000078cafe | strong icon node} type
 */
export interface StrongIconNode extends BaseNode {
  type: "strongIcon";
  pathType: "root" | "relative";
  path: string;
}

/**
 * Scrapbox {@link https://scrapbox.io/help/Syntax#58348ae2651ee500008d67cb | strong node} type
 */
export interface StrongNode extends BaseNode {
  type: "strong";
  nodes: Node[];
}

/**
 * Scrapbox {@link https://scrapbox.io/help/Syntax#5e7c7a17651ee50000d77b2e | formula node} type
 */
export interface FormulaNode extends BaseNode {
  type: "formula";
  formula: string;
}

/**
 * Scrapbox {@link https://scrapbox.io/help/Syntax#58348ae2651ee500008d67cc | decoration node} type
 */
export interface DecorationNode extends BaseNode {
  type: "decoration";
  rawDecos: string;
  decos: Decoration[];
  nodes: Node[];
}

/**
 * Scrapbox {@link https://scrapbox.io/help/Syntax#58348ae2651ee500008d67db | code node} type
 */
export interface CodeNode extends BaseNode {
  type: "code";
  text: string;
}

/**
 * Scrapbox {@link https://scrapbox.io/help/Code_notation#587d557d651ee50000dc693d | command line node} type
 */
export interface CommandLineNode extends BaseNode {
  type: "commandLine";
  symbol: string;
  text: string;
}

/**
 * Scrapbox blank node type
 */
export interface BlankNode extends BaseNode {
  type: "blank";
  text: string;
}

/**
 * Scrapbox {@link https://scrapbox.io/help/Syntax#58348ae2651ee500008d67b8 | image node} type
 */
export interface ImageNode extends BaseNode {
  type: "image";
  src: string;
  link: string;
}

/**
 * Scrapbox {@link https://scrapbox.io/help/Link | link node} type
 */
export interface LinkNode extends BaseNode {
  type: "link";
  pathType: "absolute" | "root" | "relative";
  href: string;
  content: string;
}

/**
 * Scrapbox {@link https://scrapbox.io/help-jp/Location%E8%A8%98%E6%B3%95 | Google Map node} type
 */
export interface GoogleMapNode extends BaseNode {
  type: "googleMap";
  latitude: number;
  longitude: number;
  zoom: number;
  place: string;
  url: string;
}

/**
 * Scrapbox {@link https://scrapbox.io/help/Syntax#58348ae2651ee500008d67c7 | icon node} type
 */
export interface IconNode extends BaseNode {
  type: "icon";
  pathType: "root" | "relative";
  path: string;
}

/**
 * Scrapbox {@link https://scrapbox.io/help/Syntax#58348ae2651ee500008d67d5 | hash tag node} type
 */
export interface HashTagNode extends BaseNode {
  type: "hashTag";
  href: string;
}

/**
 * Scrapbox number list node type
 */
export interface NumberListNode extends BaseNode {
  type: "numberList";
  rawNumber: string;
  number: number;
  nodes: Node[];
}

/**
 * Scrapbox plain node type
 */
export interface PlainNode extends BaseNode {
  type: "plain";
  text: string;
}

/**
 * Scrapbox node type
 */
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
  | NumberListNode
  | PlainNode;
