import { NodeType, PlainNodeType } from './types'

const createPlainNode = (text: string): PlainNodeType => ({
  type: 'plain',
  text
})

const parseToNodes = (line: string, indent: number): Array<NodeType> => {
  return [ createPlainNode(line.trim()) ]
}

export default parseToNodes
