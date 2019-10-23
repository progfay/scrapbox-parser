/* global describe it expect */

import { BlockComponentType, convertToBlockComponents } from '../../src/block/BlockComponent'
import { BlockType } from '../../src/block'
import { convertToBlocks } from '../../src/parse'

describe('line', () => {
  it('Line that have multi node', () => {
    const input = '[Link][Link]'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'link',
            pathType: 'relative',
            href: 'Link',
            content: ''
          },
          {
            type: 'link',
            pathType: 'relative',
            href: 'Link',
            content: ''
          }
        ]
      }
    ])
  })

  it('Decoration line includes internal link', () => {
    const input = '[* [Link]]'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
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
                href: 'Link',
                content: ''
              }
            ]
          }
        ]
      }
    ])
  })

  it('Decoration line includes internal link', () => {
    const input = '[* [https://example.com example]]'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
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
                pathType: 'absolute',
                href: 'https://example.com',
                content: 'example'
              }
            ]
          }
        ]
      }
    ])
  })

  it('Multi `]`', () => {
    const input = '[* [Link]`code`[Link]]'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
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
            href: 'Link',
            content: ''
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
