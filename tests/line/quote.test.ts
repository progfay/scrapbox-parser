/* global describe it expect */

import { BlockComponentType, convertToBlockComponents } from '../../src/block/BlockComponent'
import { BlockType } from '../../src/block'
import { convertToBlocks } from '../../src/parse'

describe('quote', () => {
  it('Simple quote', () => {
    const input = '> Simple quote'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'quote',
            nodes: [
              {
                type: 'plain',
                text: ' Simple quote'
              }
            ]
          }
        ]
      }
    ])
  })

  it('Empty quote', () => {
    const input = '>'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'quote',
            nodes: []
          }
        ]
      }
    ])
  })
})
