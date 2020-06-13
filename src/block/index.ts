import { isTitleComponent, convertToTitle } from './Title'
import { isCodeBlockComponent, convertToCodeBlock } from './CodeBlock'
import { isTableComponent, convertToTable } from './Table'
import { convertToLine } from './Line'

import type { PackedBlockComponent } from './PackedBlockComponent'
import type { Title } from './Title'
import type { CodeBlock } from './CodeBlock'
import type { Table } from './Table'
import type { Line } from './Line'

export type Block = Title | CodeBlock | Table | Line

export const convertToBlock = (
  packedBlockComponent: PackedBlockComponent
): Block => {
  if (isTitleComponent(packedBlockComponent)) { return convertToTitle(packedBlockComponent) }
  if (isCodeBlockComponent(packedBlockComponent)) { return convertToCodeBlock(packedBlockComponent) }
  if (isTableComponent(packedBlockComponent)) { return convertToTable(packedBlockComponent) }
  return convertToLine(packedBlockComponent)
}
