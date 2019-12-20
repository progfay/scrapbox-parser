/* global jest describe it expect */

import * as fs from 'fs'
import { Transform, TransformCallback } from 'stream'
import { parse } from '../../src/parse'
import { BlockType } from '../../src/block'
import { ScrapboxParserStream } from '../../src/stream'

type CheckFunctionType = (block: BlockType) => void

const FILE_PATH = './tests/stream/body.txt'

class CheckStream extends Transform {
  done: jest.DoneCallback
  check: CheckFunctionType

  constructor (check: CheckFunctionType, done: jest.DoneCallback) {
    super({ objectMode: true })
    this.check = check
    this.done = done
  }

  _transform (block: BlockType, _encoding: string, callback: TransformCallback) {
    this.check(block)
    callback()
  }

  _final (callback: TransformCallback) {
    this.done()
    callback()
  }
}

describe('stream', () => {
  it('Same behavior', async (done) => {
    const generateChecker = (): CheckFunctionType => {
      const page = fs.readFileSync(FILE_PATH, { encoding: 'utf8' })
      const answer = parse(page, { hasTitle: true })
      return (block) => {
        expect(block).toEqual(answer.shift())
      }
    }

    fs.createReadStream(FILE_PATH, { highWaterMark: 100, encoding: 'utf8' })
      .pipe(new ScrapboxParserStream())
      .pipe(new CheckStream(generateChecker(), done))
  })

  it('Title Block without `hasTitle` option', async (done) => {
    const check: CheckFunctionType = (block) => { expect(block.type).not.toEqual('title') }
    fs.createReadStream(FILE_PATH, { highWaterMark: 100, encoding: 'utf8' })
      .pipe(new ScrapboxParserStream({ hasTitle: false }))
      .pipe(new CheckStream(check, done))
  })
})
