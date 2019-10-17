/* global describe it expect */

import { BlockComponentType, convertToBlockComponents } from '../../src/block/BlockComponent'
import { BlockType } from '../../src/block'
import { convertToBlocks } from '../../src/parse'

describe('helpfeel', () => {
  it('Simple helpfeel', () => {
    const input = '? Simple helpfeel'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'helpfeel',
            text: 'Simple helpfeel'
          }
        ]
      }
    ])
  })

  it('No head `?` is not helpfeel', () => {
    const input = 'a ? not helpfeel'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: 'a ? not helpfeel'
          }
        ]
      }
    ])
  })

  it('Quoted ? is not helpfeel', () => {
    const input = '> ? Quoted'
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
                text: ' ? Quoted'
              }
            ]
          }
        ]
      }
    ])
  })
})
