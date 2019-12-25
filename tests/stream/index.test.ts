import * as fs from 'fs'
import { PassThrough, TransformCallback } from 'stream'
import { parse, ScrapboxParserStream, BlockType } from '../../src'

const FILE_PATH = './tests/stream/body.txt'

class CheckStream<T> extends PassThrough {
  done: jest.DoneCallback
  check: (chunk: T) => void

  constructor (check: (chunk: T) => void, done: jest.DoneCallback) {
    super({ objectMode: true })
    this.check = check
    this.done = done
  }

  _transform (chunk: T, _encoding: string, callback: TransformCallback) {
    this.check(chunk)
    callback()
  }

  _final (callback: TransformCallback) {
    this.done()
    callback()
  }
}

describe('stream', () => {
  it('Same behavior', async (done) => {
    const generateChecker = () => {
      const page = fs.readFileSync(FILE_PATH, { encoding: 'utf8' })
      const answer = parse(page, { hasTitle: true })
      return (block: BlockType) => {
        expect(block).toEqual(answer.shift())
      }
    }

    fs.createReadStream(FILE_PATH, { highWaterMark: 100, encoding: 'utf8' })
      .pipe(new ScrapboxParserStream())
      .pipe(new CheckStream(generateChecker(), done))
  })

  it('Title Block without `hasTitle` option', async (done) => {
    const check = (block: BlockType) => { expect(block.type).not.toEqual('title') }
    fs.createReadStream(FILE_PATH, { highWaterMark: 100, encoding: 'utf8' })
      .pipe(new ScrapboxParserStream({ hasTitle: false }))
      .pipe(new CheckStream(check, done))
  })
})
