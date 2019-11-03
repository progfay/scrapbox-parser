/* global describe it expect */

import '../jest-setup'

describe('plain', () => {
  it('Simple plain text', () => {
    expect('Plain text').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
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
    expect('').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: []
      }
    ])
  })

  it('Keep tail space', () => {
    expect('Tail space ->  ').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
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
