/* global describe it expect */

import { BlockComponentType, convertToBlockComponents } from '../../src/block/BlockComponent'
import { BlockType } from '../../src/block'
import { convertToBlocks } from '../../src/parse'

describe('hashTag', () => {
  it('Simple hashTag', () => {
    const input = '#tag'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'hashTag',
            href: 'tag'
          }
        ]
      }
    ])
  })

  it('Only `#` is not hashTag', () => {
    const input = '#'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: '#'
          }
        ]
      }
    ])
  })

  it('HashTag includes `#`', () => {
    const input = '#hash#Tag'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'hashTag',
            href: 'hash#Tag'
          }
        ]
      }
    ])
  })

  it('HashTag in sentence with spaces', () => {
    const input = 'This is a #tag .'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: 'This is a '
          },
          {
            type: 'hashTag',
            href: 'tag'
          },
          {
            type: 'plain',
            text: ' .'
          }
        ]
      }
    ])
  })

  it('HashTag in sentence without spaces is not hashTag', () => {
    const input = '→#notTag←'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: '→#notTag←'
          }
        ]
      }
    ])
  })

  it('Multiple hashTag', () => {
    const input = '#hoge #fuga #piyo'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'hashTag',
            href: 'hoge'
          },
          {
            type: 'plain',
            text: ' '
          },
          {
            type: 'hashTag',
            href: 'fuga'
          },
          {
            type: 'plain',
            text: ' '
          },
          {
            type: 'hashTag',
            href: 'piyo'
          }
        ]
      }
    ])
  })
})
