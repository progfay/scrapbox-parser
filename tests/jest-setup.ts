import { parse, ParserOption } from '../src'
import { toMatchSnapshot } from 'jest-snapshot'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    export interface Expect {
      toMatchSnapshotWhenParsing: (
        received: string,
        option?: Partial<ParserOption>
      ) => CustomMatcherResult
    }

    export interface Matchers<R> {
      toMatchSnapshotWhenParsing: (option?: Partial<ParserOption>) => R
    }
  }
}

expect.extend({
  toMatchSnapshotWhenParsing(this: any, received: string, option?: Partial<ParserOption>) {
    const blocks = parse(received, option)
    return toMatchSnapshot.call(this, blocks, 'toMatchSnapshotWhenParsing')
  }
})
