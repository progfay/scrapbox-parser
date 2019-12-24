/* global expect */

import { parse, ParserOptionType } from '../src'
import { toMatchSnapshot } from 'jest-snapshot'

declare global {
  namespace jest {
    interface Expect {
      toMatchSnapshotWhenParsing: (received: string, option: ParserOptionType) => CustomMatcherResult
    }

    interface Matchers<R> {
      toMatchSnapshotWhenParsing(option: ParserOptionType): CustomMatcherResult
    }
  }
}

expect.extend({
  toMatchSnapshotWhenParsing (this: any, received: string, { hasTitle }: ParserOptionType): jest.CustomMatcherResult {
    const blocks = parse(received, { hasTitle })
    return toMatchSnapshot.call(this, blocks, 'toMatchSnapshotWhenParsing')
  }
})
