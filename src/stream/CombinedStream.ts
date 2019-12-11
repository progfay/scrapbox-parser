import { PassThrough, Writable } from 'stream'

export default class CombinedStream extends PassThrough {
  stream: Writable

  constructor (...streams: Writable[]) {
    super({ objectMode: true })

    this.stream = streams.reduce(
      (source, destination) => source.pipe(destination),
      this as Writable
    )

    this.pipe = (destination, options) => (
      this.stream.pipe(destination, options)
    )
  }
}
