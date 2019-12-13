import { Transform, TransformCallback } from 'stream'
import { convertToBlock } from '../block'
import { PackedBlockComponentType } from '../block/PackedBlockComponent'

export default class ParserStream extends Transform {
  constructor () {
    super({ objectMode: true })
  }

  _transform (chunk: PackedBlockComponentType, _encoding: string, callback: TransformCallback) {
    callback(null, convertToBlock(chunk))
  }
}
