/* global describe it expect */

import '../jest-setup'

describe('helpfeel', () => {
  it('Simple helpfeel', () => {
    expect('? Simple helpfeel').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'helpfeel',
            text: 'Simple helpfeel'
          }
        ]
      }
    ])
  })

  it('No head `?` is not helpfeel', () => {
    expect('a ? not helpfeel').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: 'a ? not helpfeel'
          }
        ]
      }
    ])
  })

  it('Quoted ? is not helpfeel', () => {
    expect('> ? Quoted').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'quote',
            nodes: [
              {
                type: 'plain',
                text: ' ? Quoted'
              }
            ]
          }
        ]
      }
    ])
  })
})
