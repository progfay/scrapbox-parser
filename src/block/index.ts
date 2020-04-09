import { isTitleComponent, convertToTitle } from './Title'
import { isCodeBlockComponent, convertToCodeBlock } from './CodeBlock'
import { isTableComponent, convertToTable } from './Table'
import { convertToLine } from './Line'

import type { PackedBlockComponentType } from './PackedBlockComponent'
import type { TitleType } from './Title'
import type { CodeBlockType } from './CodeBlock'
import type { TableType } from './Table'
import type { LineType } from './Line'

export type BlockType = TitleType | CodeBlockType | TableType | LineType

export const convertToBlock = (packedBlockComponent: PackedBlockComponentType): BlockType => {
  if (isTitleComponent(packedBlockComponent)) return convertToTitle(packedBlockComponent)
  if (isCodeBlockComponent(packedBlockComponent)) return convertToCodeBlock(packedBlockComponent)
  if (isTableComponent(packedBlockComponent)) return convertToTable(packedBlockComponent)
  return convertToLine(packedBlockComponent)
}
