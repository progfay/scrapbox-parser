import { NodeType } from '../node'

export type BlockType = {
  indent: number
  nodes: Array<NodeType>
}

export * from './BlockComponent'
