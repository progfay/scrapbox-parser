/* global describe it expect */

import { LineComponentType, convertToLineComponents } from '../src/line'
import parseToLines from '../src/parseToLines'

describe('plain', () => {
  it('Simple plain text', () => {
    const input = 'Plain text'
    const lineComponents: Array<LineComponentType> = convertToLineComponents(input)
    expect(parseToLines(lineComponents)).toEqual([
      {
        indent: 0,
        nodes: [
          {
            type: 'plain',
            text: 'Plain text'
          }
        ]
      }
    ])
  })

  it('Blank line', () => {
    const input = ''
    const lineComponents: Array<LineComponentType> = convertToLineComponents(input)
    expect(parseToLines(lineComponents)).toEqual([
      {
        indent: 0,
        nodes: [
          {
            type: 'plain',
            text: ''
          }
        ]
      }
    ])
  })

  it('Keep tail space', () => {
    const input = 'Tail space ->  '
    const lineComponents: Array<LineComponentType> = convertToLineComponents(input)
    expect(parseToLines(lineComponents)).toEqual([
      {
        indent: 0,
        nodes: [
          {
            type: 'plain',
            text: 'Tail space ->  '
          }
        ]
      }
    ])
  })
})
