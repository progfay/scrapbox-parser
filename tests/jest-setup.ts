import { parse, ParserOption } from '../src'
import { toMatchSnapshot } from 'jest-snapshot'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Expect {
      toMatchSnapshotWhenParsing: (
        received: string,
        option?: Partial<ParserOption>
      ) => CustomMatcherResult
    }

    interface Matchers<R, T> {
      toMatchSnapshotWhenParsing: (option?: Partial<ParserOption>) => CustomMatcherResult
    }
  }
}

expect.extend({
  toMatchSnapshotWhenParsing(this: any, received: string, option?: Partial<ParserOption>) {
    const blocks = parse(received, option)
    return toMatchSnapshot.call(this, blocks, 'toMatchSnapshotWhenParsing')
  }
})
