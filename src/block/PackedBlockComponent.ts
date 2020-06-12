import type { ParserOption } from '../parse'
import type { BlockComponent } from './BlockComponent'
import type { TitleComponent } from './Title'
import type { CodeBlockComponent } from './CodeBlock'
import type { TableComponent } from './Table'
import type { LineComponent } from './Line'

export type PackedBlockComponent = TitleComponent | CodeBlockComponent | TableComponent | LineComponent

export const packBlockComponents = (blockComponents: BlockComponent[], { hasTitle }: ParserOption): PackedBlockComponent[] => {
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

  const packedBlockComponents: PackedBlockComponent[] = []
  let packingComponent: ((CodeBlockComponent | TableComponent) & { indent: number }) | null = null

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
      } as ((CodeBlockComponent | TableComponent) & { indent: number })
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
