/* global jest describe it expect */

import * as fs from 'fs'
import { Transform, TransformCallback } from 'stream'
import { parse, ScrapboxParserStream, BlockType } from '../../src'

const FILE_PATH = './tests/stream/body.txt'

class CheckStream extends Transform {
  answer: BlockType[]
  done: jest.DoneCallback

  constructor (done: jest.DoneCallback) {
    super({ objectMode: true })
    const page = fs.readFileSync(FILE_PATH, { encoding: 'utf8' })
    this.answer = parse(page, { hasTitle: true })
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
      .pipe(new ScrapboxParserStream({ hasTitle: true }))
      .pipe(new CheckStream(done))
  })
})
