/* global describe it expect */

describe('strong', () => {
  it('Simple strong', () => {
    expect('[[Simple strong]]').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'strong',
            nodes: [
              {
                type: 'plain',
                text: 'Simple strong'
              }
            ]
          }
        ]
      }
    ])
  })

  it('[[]] is not strong', () => {
    expect('[[]]').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: '[[]]'
          }
        ]
      }
    ])
  })
})
