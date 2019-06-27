/* global describe it expect */

import { BlockComponentType, convertToBlockComponents } from '../../src/block/BlockComponent'
import { BlockType } from '../../src/block'
import { convertToBlocks } from '../../src/parse'

describe('line', () => {
  it('Line that have multi node', () => {
    const input = '[Link][Link]'
    const blockComponents: Array<BlockComponentType> = convertToBlockComponents(input)
    const blocks: Array<BlockType> = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'link',
            pathType: 'relative',
            href: 'Link'
          },
          {
            type: 'link',
            pathType: 'relative',
            href: 'Link'
          }
        ]
      }
    ])
  })

  it('Line that have nested node', () => {
    const input = '[* [Link]]'
    const blockComponents: Array<BlockComponentType> = convertToBlockComponents(input)
    const blocks: Array<BlockType> = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'decoration',
            decos: ['*-1'],
            nodes: [
              {
                type: 'link',
                pathType: 'relative',
                href: 'Link'
              }
            ]
          }
        ]
      }
    ])
  })

  it('Multi `]`', () => {
    const input = '[* [Link]`code`[Link]]'
    const blockComponents: Array<BlockComponentType> = convertToBlockComponents(input)
    const blocks: Array<BlockType> = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'decoration',
            decos: ['*-1'],
            nodes: [
              {
                type: 'plain',
                text: '[Link'
              }
            ]
          },
          {
            type: 'code',
            text: 'code'
          },
          {
            type: 'link',
            pathType: 'relative',
            href: 'Link'
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
