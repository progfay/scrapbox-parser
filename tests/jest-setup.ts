/* global expect */

import { BlockComponentType, convertToBlockComponents } from '../src/block/BlockComponent'
import { BlockType } from '../src/block'
import { convertToBlocks } from '../src/parse'

declare global {
  namespace jest {
    interface Expect {
      toEqualWhenParsing: (received: string, expected: BlockType[]) => CustomMatcherResult
    }

    interface Matchers<R> {
      toEqualWhenParsing(expected: BlockType[]): CustomMatcherResult
    }
  }
}

expect.extend({
  toEqualWhenParsing (received: string, expected: BlockType[]): jest.CustomMatcherResult {
    const blockComponents: BlockComponentType[] = convertToBlockComponents(received)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    return {
      message: () => '',
      pass: this.equals(blocks, expected)
    }
  }
})
