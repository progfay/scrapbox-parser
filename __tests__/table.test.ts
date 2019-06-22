/* global describe it expect */
/* eslint-disable no-tabs, no-irregular-whitespace */

import { LineComponentType, convertToLineComponents } from '../src/line'
import parseToLines from '../src/parseToLines'

describe('Table', () => {
  it('Simple table', () => {
    const input = `table:hello
${'\t'}1${'\t'}2${'\t'}3
${'\t'}1 ${'\t'}2 ${'\t'}3
${'\t'}------${'\t'}------${'\t'}------
${'\t'}a${'\t'}b${'\t'}c`
    const lineComponents: Array<LineComponentType> = convertToLineComponents(input)
    expect(parseToLines(lineComponents)).toEqual([
      {
        indent: 0,
        nodes: [
          {
            type: 'table',
            fileName: 'hello',
            cells: [
              ['1', '2', '3'],
              ['1 ', '2 ', '3'],
              ['------', '------', '------'],
              ['a', 'b', 'c']
            ]
          }
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
    const lineComponents: Array<LineComponentType> = convertToLineComponents(input)
    expect(parseToLines(lineComponents)).toEqual([
      {
        indent: 1,
        nodes: [
          {
            type: 'table',
            fileName: 'bulleted',
            cells: [
              ['1', '2', '3'],
              ['1 ', '2 ', '3'],
              ['------', '------', '------'],
              ['a', 'b', 'c']
            ]
          }
        ]
      }
    ])
  })

  it('Table with empty cells', () => {
    const input = `table: 
${'\t'} ${'\t'}　${'\t'}  
${'\t'}${'\t'}${'\t'}`
    const lineComponents: Array<LineComponentType> = convertToLineComponents(input)
    expect(parseToLines(lineComponents)).toEqual([
      {
        indent: 0,
        nodes: [
          {
            type: 'table',
            fileName: ' ',
            cells: [
              [' ', '　', '  '],
              ['', '', '']
            ]
          }
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
    const lineComponents: Array<LineComponentType> = convertToLineComponents(input)
    expect(parseToLines(lineComponents)).toEqual([
      {
        indent: 0,
        nodes: [
          {
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
    const lineComponents: Array<LineComponentType> = convertToLineComponents(input)
    expect(parseToLines(lineComponents)).toEqual([
      {
        indent: 0,
        nodes: [
          {
            type: 'table',
            fileName: 'hello',
            cells: [
              ['1', '2', '3'],
              ['1 ', '2 ', '3'],
              ['------', '------', '------'],
              ['a', 'b', 'c']
            ]
          }
        ]
      },
      {
        indent: 0,
        nodes: [
          {
            type: 'table',
            fileName: 'hello',
            cells: [
              ['1', '2', '3'],
              ['1 ', '2 ', '3'],
              ['------', '------', '------'],
              ['a', 'b', 'c']
            ]
          }
        ]
      }
    ])
  })
})
