import type { ParserOption } from '../parse'
import type { Row } from './Row'
import type { TitlePack } from './Title'
import type { CodeBlockPack } from './CodeBlock'
import type { TablePack } from './Table'
import type { LinePack } from './Line'

export type Pack = TitlePack | CodeBlockPack | TablePack | LinePack

const isChildRowOfPack = (pack: Pack, row: Row): boolean =>
  (pack.type === 'codeBlock' || pack.type === 'table') && row.indent > pack.rows[0].indent

const packing = (packs: Pack[], row: Row): Pack[] => {
  if (packs.length > 0 && isChildRowOfPack(packs[packs.length - 1], row)) {
    packs[packs.length - 1].rows.push(row)
    return packs
  }

  packs.push({
    type: /^\s*code:/.test(row.text) ? 'codeBlock' : /^\s*table:/.test(row.text) ? 'table' : 'line',
    rows: [row]
  })

  return packs
}

export const packRows = (rows: Row[], opts: ParserOption): Pack[] => {
  if (opts.hasTitle ?? true) {
    const [title, ...body] = rows
    return [
      {
        type: 'title',
        rows: [title]
      },
      ...packRows(body, { hasTitle: false })
    ]
  }

  return rows.reduce(packing, [])
}
