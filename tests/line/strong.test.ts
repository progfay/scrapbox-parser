/* global describe it expect */

import { BlockComponentType, convertToBlockComponents } from '../../src/block/BlockComponent'
import { BlockType } from '../../src/block'
import { convertToBlocks } from '../../src/parse'

describe('strong', () => {
  it('Simple strong', () => {
    const input = '[[Simple strong]]'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'strong',
            nodes: [
              {
                type: 'plain',
                text: 'Simple strong'
              }
            ]
          }
        ]
      }
    ])
  })

  it('[[]] is not strong', () => {
    const input = '[[]]'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: '[[]]'
          }
        ]
      }
    ])
  })
})
