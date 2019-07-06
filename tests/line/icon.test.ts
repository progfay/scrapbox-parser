/* global describe it expect */

import { BlockComponentType, convertToBlockComponents } from '../../src/block/BlockComponent'
import { BlockType } from '../../src/block'
import { convertToBlocks } from '../../src/parse'

describe('icon', () => {
  it('Simple root icon', () => {
    const input = '[/icons/+1.icon]'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'icon',
            pathType: 'root',
            path: '/icons/+1'
          }
        ]
      }
    ])
  })

  it('Simple relative icon', () => {
    const input = '[me.icon]'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'icon',
            pathType: 'relative',
            path: 'me'
          }
        ]
      }
    ])
  })

  it('Multiple icons', () => {
    const input = '[me.icon*3]'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'icon',
            pathType: 'relative',
            path: 'me'
          },
          {
            type: 'icon',
            pathType: 'relative',
            path: 'me'
          },
          {
            type: 'icon',
            pathType: 'relative',
            path: 'me'
          }
        ]
      }
    ])
  })
})
