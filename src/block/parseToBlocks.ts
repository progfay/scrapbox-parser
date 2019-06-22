import { BlockType, BlockComponentType } from '.'
import { createPlainNode } from '../node/PlainNode'
import { createCodeBlockNode } from '../node/CodeBlockNode'
import { createTableNode } from '../node/TableNode'

const parseToBlocks = (blockComponents: Array<BlockComponentType>): Array<BlockType> => {
  const blocks: Array<BlockType> = []
  let codeBlockBlockComponents: Array<BlockComponentType> = []
  let tableBlockComponents: Array<BlockComponentType> = []

  while (blockComponents.length > 0) {
    const block = blockComponents.shift()
    if (!block) continue
    const { indent, text } = block

    if (codeBlockBlockComponents.length > 0) {
      if (indent > codeBlockBlockComponents[0].indent) {
        codeBlockBlockComponents.push(block)
        continue
      } else {
        blocks.push(
          {
            indent,
            nodes: [createCodeBlockNode(codeBlockBlockComponents)]
          }
        )
        codeBlockBlockComponents = []
      }
    }

    if (tableBlockComponents.length > 0) {
      if (indent > tableBlockComponents[0].indent) {
        tableBlockComponents.push(block)
        continue
      } else {
        blocks.push(
          {
            indent,
            nodes: [createTableNode(tableBlockComponents)]
          }
        )
        tableBlockComponents = []
      }
    }

    if (text.match(/^\s*code:(.+)$/)) {
      codeBlockBlockComponents.push(block)
      continue
    }

    if (text.match(/^\s*table:(.+)$/)) {
      tableBlockComponents.push(block)
      continue
    }

    blocks.push(
      {
        indent,
        nodes: [createPlainNode(text)]
      }
    )
  }

  if (codeBlockBlockComponents.length > 0) {
    blocks.push(
      {
        indent: codeBlockBlockComponents[0].indent,
        nodes: [createCodeBlockNode(codeBlockBlockComponents)]
      }
    )
  }

  if (tableBlockComponents.length > 0) {
    blocks.push(
      {
        indent: tableBlockComponents[0].indent,
        nodes: [createTableNode(tableBlockComponents)]
      }
    )
  }

  return blocks
}

export default parseToBlocks
