import { Transform, TransformCallback } from 'stream'
import { BlockComponentType } from '../block/BlockComponent'
import { CodeBlockComponentType } from '../block/CodeBlock'
import { TableComponentType } from '../block/Table'

export type PackingComponentType = ((CodeBlockComponentType | TableComponentType) & { indent: number, components: BlockComponentType[] }) | null

export default class PackingStream extends Transform {
  packingComponent: PackingComponentType = null

  constructor () {
    super({ objectMode: true })
  }

  _transform (blockComponent: BlockComponentType, _encoding: string, callback: TransformCallback): void {
    const { indent, text } = blockComponent
    if (this.packingComponent) {
      if (indent > this.packingComponent.indent) {
        this.packingComponent.components.push(blockComponent)
        callback()
        return
      } else {
        this.push(this.packingComponent)
        this.packingComponent = null
      }
    }

    const isCodeBlock = text.match(/^\s*code:(.+)$/)
    const isTable = text.match(/^\s*table:(.+)$/)
    if (isCodeBlock || isTable) {
      this.packingComponent = {
        type: isCodeBlock ? 'codeBlock' : 'table',
        components: [ blockComponent ],
        indent
      } as PackingComponentType
    } else {
      this.push(
        {
          type: 'line',
          component: blockComponent
        }
      )
    }
    callback()
  }

  _flash (callback: TransformCallback) {
    if (this.packingComponent) callback(null, this.packingComponent)
  }
}
