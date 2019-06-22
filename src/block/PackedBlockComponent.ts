import { BlockComponentType } from './BlockComponent'
import { CodeBlockComponentType } from './CodeBlock'
import { TableComponentType } from './Table'
import { LineComponentType } from './Line'

export type PackedBlockComponentType = CodeBlockComponentType | TableComponentType | LineComponentType

export const packBlockComponents = (blockComponents: Array<BlockComponentType>): Array<PackedBlockComponentType> => {
  const packedBlockComponents: Array<PackedBlockComponentType> = []
  let codeBlockComponents: Array<BlockComponentType> = []
  let tableComponents: Array<BlockComponentType> = []

  while (blockComponents.length > 0) {
    const blockComponent = blockComponents.shift()
    if (!blockComponent) continue
    const { indent, text } = blockComponent

    if (codeBlockComponents.length > 0) {
      if (indent > codeBlockComponents[0].indent) {
        codeBlockComponents.push(blockComponent)
        continue
      } else {
        packedBlockComponents.push({
          type: 'codeBlock',
          components: codeBlockComponents
        })
        codeBlockComponents = []
      }
    }

    if (tableComponents.length > 0) {
      if (indent > tableComponents[0].indent) {
        tableComponents.push(blockComponent)
        continue
      } else {
        packedBlockComponents.push({
          type: 'table',
          components: tableComponents
        })
        tableComponents = []
      }
    }

    if (text.match(/^\s*code:(.+)$/)) {
      codeBlockComponents.push(blockComponent)
      continue
    }

    if (text.match(/^\s*table:(.+)$/)) {
      tableComponents.push(blockComponent)
      continue
    }

    packedBlockComponents.push(
      {
        type: 'line',
        component: blockComponent
      }
    )
  }

  if (codeBlockComponents.length > 0) {
    packedBlockComponents.push({
      type: 'codeBlock',
      components: codeBlockComponents
    })
  }

  if (tableComponents.length > 0) {
    packedBlockComponents.push({
      type: 'table',
      components: tableComponents
    })
  }

  return packedBlockComponents
}
