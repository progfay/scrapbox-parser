import { BlockComponentType } from './BlockComponent'
import { CodeBlockComponentType } from './CodeBlock'
import { TableComponentType } from './Table'
import { LineComponentType } from './Line'

export type PackedBlockComponentType = CodeBlockComponentType | TableComponentType | LineComponentType

export const packBlockComponents = (blockComponents: BlockComponentType[]): PackedBlockComponentType[] => {
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
        components: [ blockComponent ],
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
