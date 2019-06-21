/* global describe it expect */

import { LineComponentType } from '../src/types'
import convertToLineComponent from '../src/convertToLineComponents'
import parseToLines from '../src/parseToLines'

describe('plain', () => {
  it('Simple plain text', () => {
    const input = 'Plain text'
    const lineComponents: Array<LineComponentType> = convertToLineComponent(input)
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
    const lineComponents: Array<LineComponentType> = convertToLineComponent(input)
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
    const lineComponents: Array<LineComponentType> = convertToLineComponent(input)
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
