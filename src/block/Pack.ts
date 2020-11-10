import type { ParserOption } from '../parse'
import type { BlockComponent } from './BlockComponent'
import type { TitlePack } from './Title'
import type { CodeBlockPack } from './CodeBlock'
import type { TablePack } from './Table'
import type { LinePack } from './Line'

export type Pack = TitlePack | CodeBlockPack | TablePack | LinePack

const pack = (packing: Pack[], component: BlockComponent): Pack[] => {
  if (packing.length > 0) {
    const lastBlock = packing[packing.length - 1]

    if (
      (lastBlock.type === 'codeBlock' || lastBlock.type === 'table') &&
      component.indent > lastBlock.components[0].indent
    ) {
      lastBlock.components.push(component)
      return packing
    }
  }

  const isCodeBlock = /^\s*code:(.+)$/.test(component.text)
  const isTable = /^\s*table:(.+)$/.test(component.text)

  packing.push({
    type: isCodeBlock ? 'codeBlock' : isTable ? 'table' : 'line',
    components: [component]
  })

  return packing
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

  return blockComponents.reduce(pack, [])
}
