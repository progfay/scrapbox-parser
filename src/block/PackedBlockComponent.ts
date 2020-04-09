import type { ParserOptionType } from '../parse'
import type { BlockComponentType } from './BlockComponent'
import type { TitleComponentType } from './Title'
import type { CodeBlockComponentType } from './CodeBlock'
import type { TableComponentType } from './Table'
import type { LineComponentType } from './Line'

export type PackedBlockComponentType = TitleComponentType | CodeBlockComponentType | TableComponentType | LineComponentType

export const packBlockComponents = (blockComponents: BlockComponentType[], { hasTitle }: ParserOptionType): PackedBlockComponentType[] => {
  if (hasTitle) {
    const [title, ...body] = blockComponents
    return [
      {
        type: 'title',
        text: title.text
      },
      ...packBlockComponents(body, { hasTitle: false })
    ]
  }

  const packedBlockComponents: PackedBlockComponentType[] = []
  let packingComponent: ((CodeBlockComponentType | TableComponentType) & { indent: number }) | null = null

  for (const blockComponent of blockComponents) {
    const { indent, text } = blockComponent
    if (packingComponent) {
      if (indent > packingComponent.indent) {
        packingComponent.components.push(blockComponent)
        continue
      } else {
        packedBlockComponents.push(packingComponent)
        packingComponent = null
      }
    }

    const isCodeBlock = text.match(/^\s*code:(.+)$/)
    const isTable = text.match(/^\s*table:(.+)$/)
    if (isCodeBlock || isTable) {
      packingComponent = {
        type: isCodeBlock ? 'codeBlock' : 'table',
        components: [blockComponent],
        indent
      } as ((CodeBlockComponentType | TableComponentType) & { indent: number })
    } else {
      packedBlockComponents.push(
        {
          type: 'line',
          component: blockComponent
        }
      )
    }
  }

  if (packingComponent) packedBlockComponents.push(packingComponent)

  return packedBlockComponents
}
