/* global describe it expect */

import '../jest-setup'

describe('formula', () => {
  it('Simple formula', () => {
    expect('[$ \\frac{3}{2}^N]').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'formula',
            formula: '\\frac{3}{2}^N'
          }
        ]
      }
    ])
  })

  it('Formula includes [] with tail half-space', () => {
    expect('[$ [x] ]').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'formula',
            formula: '[x]'
          }
        ]
      }
    ])
  })

  it('Formula includes [] without tail half-space', () => {
    expect('[$ [x]]').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'formula',
            formula: '[x'
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
