import { NodeType } from '../node'

export type LineType = {
  indent: number
  nodes: Array<NodeType>
}

export * from './LineComponent'
