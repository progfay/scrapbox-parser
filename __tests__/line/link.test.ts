/* global describe it expect */

import { BlockComponentType, convertToBlockComponents } from '../../src/block/BlockComponent'
import { BlockType } from '../../src/block'
import { convertToBlocks } from '../../src/parse'

describe('link', () => {
  it('Simple absolute link', () => {
    const input = 'https://example.com/'
    const blockComponents: Array<BlockComponentType> = convertToBlockComponents(input)
    const blocks: Array<BlockType> = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'link',
            pathType: 'absolute',
            href: 'https://example.com/',
            content: ''
          }
        ]
      }
    ])
  })

  it('Simple absolute link with bracket', () => {
    const input = '[https://example.com/]'
    const blockComponents: Array<BlockComponentType> = convertToBlockComponents(input)
    const blocks: Array<BlockType> = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'link',
            pathType: 'absolute',
            href: 'https://example.com/',
            content: ''
          }
        ]
      }
    ])
  })

  it('Simple root link', () => {
    const input = '[/project/page]'
    const blockComponents: Array<BlockComponentType> = convertToBlockComponents(input)
    const blocks: Array<BlockType> = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'link',
            pathType: 'root',
            href: '/project/page'
          }
        ]
      }
    ])
  })

  it('Simple relative link', () => {
    const input = '[page]'
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
            href: 'page'
          }
        ]
      }
    ])
  })

  it('Link with content', () => {
    const input = `[https://example.com/   Example]
[Example   https://example.com/]
[https://left.com/ center https://right.com/]`
    const blockComponents: Array<BlockComponentType> = convertToBlockComponents(input)
    const blocks: Array<BlockType> = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'link',
            pathType: 'absolute',
            href: 'https://example.com/',
            content: 'Example'
          }
        ]
      },
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'link',
            pathType: 'absolute',
            href: 'https://example.com/',
            content: 'Example'
          }
        ]
      },
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'link',
            pathType: 'absolute',
            href: 'https://left.com/',
            content: 'center https://right.com/'
          }
        ]
      }
    ])
  })

  it('Root and relative link path can include space', () => {
    const input = `[page name]
[/project/page name]`
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
            href: 'page name'
          }
        ]
      },
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'link',
            pathType: 'root',
            href: 'project/page name'
          }
        ]
      }
    ])
  })
})
