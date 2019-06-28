import { PackedBlockComponentType } from './PackedBlockComponent'
import { CodeBlockType, isCodeBlockComponent, convertToCodeBlock } from './CodeBlock'
import { TableType, isTableComponent, convertToTable } from './Table'
import { LineType, convertToLine } from './Line'

export type BlockType = CodeBlockType | TableType | LineType

export const convertToBlock = (packedBlockComponent: PackedBlockComponentType): BlockType => {
  if (isCodeBlockComponent(packedBlockComponent)) return convertToCodeBlock(packedBlockComponent)
  if (isTableComponent(packedBlockComponent)) return convertToTable(packedBlockComponent)
  return convertToLine(packedBlockComponent)
}
