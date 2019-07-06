/* global describe it expect */

import { BlockComponentType, convertToBlockComponents } from '../../src/block/BlockComponent'
import { BlockType } from '../../src/block'
import { convertToBlocks } from '../../src/parse'

describe('bullet', () => {
  it('Single-byte space indent', () => {
    const input = ' Single-byte space'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 1,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: 'Single-byte space'
          }
        ]
      }
    ])
  })

  it('Double-byte space indent', () => {
    const input = '　Double-byte space'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 1,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: 'Double-byte space'
          }
        ]
      }
    ])
  })

  it('Tab indent', () => {
    // eslint-disable-next-line no-tabs
    const input = '	Tab'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 1,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: 'Tab'
          }
        ]
      }
    ])
  })

  it('Multi lines bullet', () => {
    const input = `no bullet (indent: 0)
 first bullet (indent: 1)
  second bullet (indent: 2)
   third bullet (indent: 3)`
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: 'no bullet (indent: 0)'
          }
        ]
      },
      {
        indent: 1,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: 'first bullet (indent: 1)'
          }
        ]
      },
      {
        indent: 2,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: 'second bullet (indent: 2)'
          }
        ]
      },
      {
        indent: 3,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: 'third bullet (indent: 3)'
          }
        ]
      }
    ])
  })
})
