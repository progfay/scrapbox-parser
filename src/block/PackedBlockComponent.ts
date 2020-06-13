import type { ParserOption } from '../parse'
import type { BlockComponent } from './BlockComponent'
import type { TitleComponent } from './Title'
import type { CodeBlockComponent } from './CodeBlock'
import type { TableComponent } from './Table'
import type { LineComponent } from './Line'

export type PackedBlockComponent =
  | TitleComponent
  | CodeBlockComponent
  | TableComponent
  | LineComponent

export const packBlockComponents = (
  blockComponents: BlockComponent[],
  { hasTitle }: ParserOption
): PackedBlockComponent[] => {
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
  let packingComponent:
  | ((CodeBlockComponent | TableComponent) & { indent: number })
  | null = null

  for (const blockComponent of blockComponents) {
    const { indent, text } = blockComponent
    if (packingComponent !== null) {
      if (indent > packingComponent.indent) {
        packingComponent.components.push(blockComponent)
        continue
      } else {
        packedBlockComponents.push(packingComponent)
        packingComponent = null
      }
    }

    const isCodeBlock = /^\s*code:(.+)$/.test(text)
    const isTable = /^\s*table:(.+)$/.test(text)
    if (isCodeBlock || isTable) {
      packingComponent = {
        type: isCodeBlock ? 'codeBlock' : 'table',
        components: [blockComponent],
        indent
      }
    } else {
      packedBlockComponents.push({
        type: 'line',
        component: blockComponent
      })
    }
  }

  if (packingComponent !== null) packedBlockComponents.push(packingComponent)

  return packedBlockComponents
}
