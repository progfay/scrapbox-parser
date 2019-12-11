/* global jest describe it expect */

import * as fs from 'fs'
import { Transform, TransformCallback } from 'stream'
import { convertToBlocks } from '../../src/parse'
import { BlockType } from '../../src/block'
import { convertToBlockComponents } from '../../src/block/BlockComponent'
import { ScrapboxParserStream } from '../../src/stream'

const FILE_PATH = './tests/stream/body.txt'

class CheckStream extends Transform {
  answer: BlockType[]
  done: jest.DoneCallback

  constructor (done: jest.DoneCallback) {
    super({ objectMode: true })
    const page = fs.readFileSync(FILE_PATH, { encoding: 'utf8' })
    const blockComponents = convertToBlockComponents(page)
    this.answer = convertToBlocks(blockComponents)
    this.done = done
  }

  _transform (block: BlockType, _encoding: string, callback: TransformCallback) {
    expect(block).toEqual(this.answer.shift())
    callback()
  }

  _final (callback: TransformCallback) {
    this.done()
    callback()
  }
}

describe('stream', () => {
  it('Same behavior ', async (done) => {
    fs.createReadStream(FILE_PATH, { highWaterMark: 100, encoding: 'utf8' })
      .pipe(new ScrapboxParserStream())
      .pipe(new CheckStream(done))
  })
})
