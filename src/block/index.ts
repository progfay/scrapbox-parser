import { PackedBlockComponentType } from './PackedBlockComponent'
import { CodeBlockType, isCodeBlockComponent, convertToCodeBlock } from './CodeBlock'
import { TableType, isTableComponent, convertToTable } from './Table'
import { LineType, isLineComponent, convertToLine } from './Line'

export type BlockType = CodeBlockType | TableType | LineType

export const isBlock = (obj: any): obj is BlockType => (
  obj && obj.type && (obj.type === 'codeBlock' || obj.type === 'table' || obj.type === 'line')
)

export const convertToBlock = (packedBlockComponent: PackedBlockComponentType): BlockType | undefined => {
  if (isCodeBlockComponent(packedBlockComponent)) return convertToCodeBlock(packedBlockComponent)
  if (isTableComponent(packedBlockComponent)) return convertToTable(packedBlockComponent)
  if (isLineComponent(packedBlockComponent)) return convertToLine(packedBlockComponent)
  return undefined
}
