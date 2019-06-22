/* global describe it expect */
/* eslint-disable no-tabs, no-irregular-whitespace */

import { BlockComponentType, convertToBlockComponents } from '../src/block/BlockComponent'
import { BlockType } from '../src/block'
import { convertToBlocks } from '../src/parse'

describe('Table', () => {
  it('Simple table', () => {
    const input = `table:hello
${'\t'}1${'\t'}2${'\t'}3
${'\t'}1 ${'\t'}2 ${'\t'}3
${'\t'}------${'\t'}------${'\t'}------
${'\t'}a${'\t'}b${'\t'}c`
    const blockComponents: Array<BlockComponentType> = convertToBlockComponents(input)
    const blocks: Array<BlockType> = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'table',
        fileName: 'hello',
        cells: [
          ['1', '2', '3'],
          ['1 ', '2 ', '3'],
          ['------', '------', '------'],
          ['a', 'b', 'c']
        ]
      }
    ])
  })

  it('Bulleted table', () => {
    const input = ` table:bulleted
 ${'\t'}1${'\t'}2${'\t'}3
 ${'\t'}1 ${'\t'}2 ${'\t'}3
 ${'\t'}------${'\t'}------${'\t'}------
 ${'\t'}a${'\t'}b${'\t'}c`
    const blockComponents: Array<BlockComponentType> = convertToBlockComponents(input)
    const blocks: Array<BlockType> = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 1,
        type: 'table',
        fileName: 'bulleted',
        cells: [
          ['1', '2', '3'],
          ['1 ', '2 ', '3'],
          ['------', '------', '------'],
          ['a', 'b', 'c']
        ]
      }
    ])
  })

  it('Table with empty cells', () => {
    const input = `table:${' '}
${'\t'} ${'\t'}　${'\t'}${'  '}
${'\t'}${'\t'}${'\t'}`
    const blockComponents: Array<BlockComponentType> = convertToBlockComponents(input)
    const blocks: Array<BlockType> = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'table',
        fileName: ' ',
        cells: [
          [' ', '　', '  '],
          ['', '', '']
        ]
      }
    ])
  })

  it('Staggered table', () => {
    const input = `table:Staggered
${'\t'}1${'\t'}2${'\t'}3${'\t'}4
${'\t'}1${'\t'}2${'\t'}3
${'\t'}1
${'\t'}1${'\t'}2
${'\t'}`
    const blockComponents: Array<BlockComponentType> = convertToBlockComponents(input)
    const blocks: Array<BlockType> = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'table',
        fileName: 'Staggered',
        cells: [
          ['1', '2', '3', '4'],
          ['1', '2', '3'],
          ['1'],
          ['1', '2'],
          ['']
        ]
      }
    ])
  })

  it('Consecutive table', () => {
    const input = `table:hello
${'\t'}1${'\t'}2${'\t'}3
${'\t'}1 ${'\t'}2 ${'\t'}3
${'\t'}------${'\t'}------${'\t'}------
${'\t'}a${'\t'}b${'\t'}c
table:hello
${'\t'}1${'\t'}2${'\t'}3
${'\t'}1 ${'\t'}2 ${'\t'}3
${'\t'}------${'\t'}------${'\t'}------
${'\t'}a${'\t'}b${'\t'}c`
    const blockComponents: Array<BlockComponentType> = convertToBlockComponents(input)
    const blocks: Array<BlockType> = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'table',
        fileName: 'hello',
        cells: [
          ['1', '2', '3'],
          ['1 ', '2 ', '3'],
          ['------', '------', '------'],
          ['a', 'b', 'c']
        ]
      },
      {
        indent: 0,
        type: 'table',
        fileName: 'hello',
        cells: [
          ['1', '2', '3'],
          ['1 ', '2 ', '3'],
          ['------', '------', '------'],
          ['a', 'b', 'c']
        ]
      }
    ])
  })
})
