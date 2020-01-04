import { parse, ParserOptionType } from '../src'
import { toMatchSnapshot } from 'jest-snapshot'

declare global {
  namespace jest {
    interface Expect {
      toMatchSnapshotWhenParsing: (received: string, option?: Partial<ParserOptionType>) => CustomMatcherResult
    }

    interface Matchers<R, T> {
      toMatchSnapshotWhenParsing(option?: Partial<ParserOptionType>): CustomMatcherResult
    }
  }
}

expect.extend({
  toMatchSnapshotWhenParsing (this: any, received: string, option?: Partial<ParserOptionType>) {
    const blocks = parse(received, option)
    return toMatchSnapshot.call(this, blocks, 'toMatchSnapshotWhenParsing')
  }
})
