/* global describe it expect */

describe('bullet', () => {
  it('Single-byte space indent', () => {
    expect(' Single-byte space').toEqualWhenParsing([
      {
        indent: 1,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: 'Single-byte space'
          }
        ]
      }
    ])
  })

  it('Double-byte space indent', () => {
    expect('　Double-byte space').toEqualWhenParsing([
      {
        indent: 1,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: 'Double-byte space'
          }
        ]
      }
    ])
  })

  it('Tab indent', () => {
    // eslint-disable-next-line no-tabs
    expect('	Tab').toEqualWhenParsing([
      {
        indent: 1,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: 'Tab'
          }
        ]
      }
    ])
  })

  it('Multi lines bullet', () => {
    expect(`no bullet (indent: 0)
 first bullet (indent: 1)
  second bullet (indent: 2)
   third bullet (indent: 3)`).toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: 'no bullet (indent: 0)'
          }
        ]
      },
      {
        indent: 1,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: 'first bullet (indent: 1)'
          }
        ]
      },
      {
        indent: 2,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: 'second bullet (indent: 2)'
          }
        ]
      },
      {
        indent: 3,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: 'third bullet (indent: 3)'
          }
        ]
      }
    ])
  })
})
