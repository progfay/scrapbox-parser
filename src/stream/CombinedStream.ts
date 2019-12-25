import { PassThrough, Writable, TransformOptions } from 'stream'

export default class CombinedStream extends PassThrough {
  stream: Writable

  constructor (opt: TransformOptions, ...streams: Writable[]) {
    super({ ...opt, objectMode: true })

    this.stream = streams.reduce(
      (source, destination) => source.pipe(destination),
      this as Writable
    )

    this.pipe = (destination, options) => (
      this.stream.pipe(destination, options)
    )
  }
}
