/* global describe it expect */

import { BlockComponentType, convertToBlockComponents } from '../../src/block/BlockComponent'
import { BlockType } from '../../src/block'
import { convertToBlocks } from '../../src/parse'

describe('formula', () => {
  it('Simple formula', () => {
    const input = '[$ \\frac{3}{2}^N]'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'formula',
            formula: '\\frac{3}{2}^N'
          }
        ]
      }
    ])
  })

  it('Formula includes [] with tail half-space', () => {
    const input = '[$ [x] ]'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'formula',
            formula: '[x]'
          }
        ]
      }
    ])
  })

  it('Formula includes [] without tail half-space', () => {
    const input = '[$ [x]]'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'formula',
            formula: '[x'
          },
          {
            type: 'plain',
            text: ']'
          }
        ]
      }
    ])
  })
})
