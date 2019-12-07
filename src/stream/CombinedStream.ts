import { PassThrough, Writable } from 'stream'

export default class CombinedStream extends PassThrough {
  stream: Writable = this

  constructor (...streams: Writable[]) {
    super({ objectMode: true })

    for (const destination of streams) {
      this.stream = this.stream.pipe(destination)
    }

    this.pipe = this._pipe.bind(this)
  }

  _pipe<T extends NodeJS.WritableStream> (destination: T, options?: { end?: boolean; }): T {
    return this.stream.pipe(destination, options)
  }
}
