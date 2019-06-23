/* global describe it expect */

import { BlockComponentType, convertToBlockComponents } from '../../src/block/BlockComponent'
import { BlockType } from '../../src/block'
import { convertToBlocks } from '../../src/parse'

describe('quote', () => {
  it('Simple quote', () => {
    const input = '> Simple quote'
    const blockComponents: Array<BlockComponentType> = convertToBlockComponents(input)
    const blocks: Array<BlockType> = convertToBlocks(blockComponents)
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
    const blockComponents: Array<BlockComponentType> = convertToBlockComponents(input)
    const blocks: Array<BlockType> = convertToBlocks(blockComponents)
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
                text: ''
              }
            ]
          }
        ]
      }
    ])
  })

  it('Bulleted quote', () => {
    const input = ' > Bulleted quote'
    const blockComponents: Array<BlockComponentType> = convertToBlockComponents(input)
    const blocks: Array<BlockType> = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 1,
        type: 'line',
        nodes: [
          {
            type: 'quote',
            nodes: [
              {
                type: 'plain',
                text: ' Bulleted quote'
              }
            ]
          }
        ]
      }
    ])
  })
})
