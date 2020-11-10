import { convertToTitle } from './Title'
import { convertToCodeBlock } from './CodeBlock'
import { convertToTable } from './Table'
import { convertToLine } from './Line'

import type { Pack } from './Pack'
import type { Title } from './Title'
import type { CodeBlock } from './CodeBlock'
import type { Table } from './Table'
import type { Line } from './Line'

export type Block = Title | CodeBlock | Table | Line

export const convertToBlock = (pack: Pack): Block => {
  switch (pack.type) {
    case 'title':
      return convertToTitle(pack)

    case 'codeBlock':
      return convertToCodeBlock(pack)

    case 'table':
      return convertToTable(pack)

    case 'line':
      return convertToLine(pack)
  }
}
