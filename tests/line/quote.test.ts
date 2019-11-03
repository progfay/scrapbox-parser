/* global describe it expect */

import '../jest-setup'

describe('quote', () => {
  it('Simple quote', () => {
    expect('> Simple quote').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'quote',
            nodes: [
              {
                type: 'plain',
                text: ' Simple quote'
              }
            ]
          }
        ]
      }
    ])
  })

  it('Empty quote', () => {
    expect('>').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'quote',
            nodes: []
          }
        ]
      }
    ])
  })
})
