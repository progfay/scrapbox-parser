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
  const blockComponentsLength = blockComponents.length

  for (let i = 0; i < blockComponentsLength; i++) {
    const { indent, text } = blockComponents[i]

    const isCodeBlock = /^\s*code:(.+)$/.test(text)
    const isTable = /^\s*table:(.+)$/.test(text)
    if (isCodeBlock || isTable) {
      const components: BlockComponent[] = [blockComponents[i]]

      while (i < blockComponentsLength - 1) {
        if (indent >= blockComponents[i + 1].indent) break
        components.push(blockComponents[++i])
      }

      packedBlockComponents.push({
        type: isCodeBlock ? 'codeBlock' : 'table',
        components
      })
      continue
    }

    packedBlockComponents.push({
      type: 'line',
      component: blockComponents[i]
    })
  }

  return packedBlockComponents
}
