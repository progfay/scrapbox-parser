/* global describe it expect */

describe('code', () => {
  it('Simple code with backquote', () => {
    expect('`Simple code`').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'code',
            text: 'Simple code'
          }
        ]
      }
    ])
  })

  it('Simple code with $', () => {
    expect('$ Simple code').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'code',
            text: '$ Simple code'
          }
        ]
      }
    ])
  })

  it('Empty code with backquote', () => {
    expect('``').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'code',
            text: ''
          }
        ]
      }
    ])
  })

  it('`$` is not code', () => {
    expect('$').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: '$'
          }
        ]
      }
    ])
  })

  it('`$ ` is not code', () => {
    expect('$ ').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: '$ '
          }
        ]
      }
    ])
  })

  it('`$s` is not code', () => {
    expect('$not code').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: '$not code'
          }
        ]
      }
    ])
  })
})
