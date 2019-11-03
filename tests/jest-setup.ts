/* global expect */

import { BlockComponentType, convertToBlockComponents } from '../src/block/BlockComponent'
import { BlockType } from '../src/block'
import { convertToBlocks } from '../src/parse'
import { toMatchSnapshot } from 'jest-snapshot'

declare global {
  namespace jest {
    interface Expect {
      toMatchSnapshotWhenParsing: (received: string) => CustomMatcherResult
    }

    interface Matchers<R> {
      toMatchSnapshotWhenParsing(): CustomMatcherResult
    }
  }
}

expect.extend({
  toMatchSnapshotWhenParsing (this: any, received: string): jest.CustomMatcherResult {
    const blockComponents: BlockComponentType[] = convertToBlockComponents(received)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    return toMatchSnapshot.call(this, blocks, 'toMatchSnapshotWhenParsing')
  }
})
