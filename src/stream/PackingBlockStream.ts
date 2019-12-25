import { Transform, TransformCallback } from 'stream'
import { ParserOptionType } from '../parse'
import { BlockComponentType } from '../block/BlockComponent'
import { CodeBlockComponentType } from '../block/CodeBlock'
import { TableComponentType } from '../block/Table'

export type PackingComponentType = ((CodeBlockComponentType | TableComponentType) & { indent: number, components: BlockComponentType[] }) | null

export default class PackingStream extends Transform {
  shouldPackTitle: boolean
  packingComponent: PackingComponentType = null

  constructor ({ hasTitle }: ParserOptionType) {
    super({ objectMode: true })
    this.shouldPackTitle = hasTitle
  }

  _transform (blockComponent: BlockComponentType, _encoding: string, callback: TransformCallback): void {
    const { indent, text } = blockComponent

    if (this.shouldPackTitle) {
      callback(null, {
        type: 'title',
        text: blockComponent.text
      })
      this.shouldPackTitle = false
      return
    }

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

  _final (callback: TransformCallback) {
    callback(null, this.packingComponent)
  }
}
