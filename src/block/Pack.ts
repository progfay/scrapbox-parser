import type { ParserOption } from '../parse'
import type { BlockComponent } from './BlockComponent'
import type { TitlePack } from './Title'
import type { CodeBlockPack } from './CodeBlock'
import type { TablePack } from './Table'
import type { LinePack } from './Line'

export type Pack = TitlePack | CodeBlockPack | TablePack | LinePack

const isChildBlockComponentOfPack = (pack: Pack, component: BlockComponent): boolean =>
  (pack.type === 'codeBlock' || pack.type === 'table') &&
  component.indent > pack.components[0].indent

const packing = (packs: Pack[], component: BlockComponent): Pack[] => {
  if (packs.length > 0 && isChildBlockComponentOfPack(packs[packs.length - 1], component)) {
    packs[packs.length - 1].components.push(component)
    return packs
  }

  packs.push({
    type: /^\s*code:/.test(component.text)
      ? 'codeBlock'
      : /^\s*table:/.test(component.text)
      ? 'table'
      : 'line',
    components: [component]
  })

  return packs
}

export const packBlockComponents = (
  blockComponents: BlockComponent[],
  opts: ParserOption
): Pack[] => {
  if (opts.hasTitle ?? true) {
    const [title, ...body] = blockComponents
    return [
      {
        type: 'title',
        components: [title]
      },
      ...packBlockComponents(body, { hasTitle: false })
    ]
  }

  return blockComponents.reduce(packing, [])
}
