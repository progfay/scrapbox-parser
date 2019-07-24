/* global describe it expect */
/* eslint-disable no-irregular-whitespace */

import { BlockComponentType, convertToBlockComponents } from '../../src/block/BlockComponent'
import { BlockType } from '../../src/block'
import { convertToBlocks } from '../../src/parse'

describe('blank', () => {
  it('Simple half-space blank', () => {
    const input = `[ ]`
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'blank',
            text: ' '
          }
        ]
      }
    ])
  })

  it('Simple double-byte space blank', () => {
    const input = `[　]`
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'blank',
            text: '　'
          }
        ]
      }
    ])
  })

  it('Simple tab blank', () => {
    const input = `[\t]`
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'blank',
            text: '\t'
          }
        ]
      }
    ])
  })

  it('Multi char blank', () => {
    const input = `[ 　 \t　\t ]`
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'blank',
            text: ' 　 \t　\t '
          }
        ]
      }
    ])
  })

  it('Blank in the sentence', () => {
    const input = `sentence[ ]sentence`
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: 'sentence'
          },
          {
            type: 'blank',
            text: ' '
          },
          {
            type: 'plain',
            text: 'sentence'
          }
        ]
      }
    ])
  })

  it('[] is not blank', () => {
    const input = `[]`
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: '[]'
          }
        ]
      }
    ])
  })

  it('Blank in the [*** ]', () => {
    const input = `[*** [ ]]`
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: '[*** '
          },
          {
            type: 'blank',
            text: ' '
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
