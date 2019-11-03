/* global describe it expect */

import '../jest-setup'

describe('hashTag', () => {
  it('Simple hashTag', () => {
    expect('#tag').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'hashTag',
            href: 'tag'
          }
        ]
      }
    ])
  })

  it('Only `#` is not hashTag', () => {
    expect('#').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: '#'
          }
        ]
      }
    ])
  })

  it('HashTag includes `#`', () => {
    expect('#hash#Tag').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'hashTag',
            href: 'hash#Tag'
          }
        ]
      }
    ])
  })

  it('HashTag in sentence with spaces', () => {
    expect('This is a #tag .').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: 'This is a '
          },
          {
            type: 'hashTag',
            href: 'tag'
          },
          {
            type: 'plain',
            text: ' .'
          }
        ]
      }
    ])
  })

  it('HashTag in sentence without spaces is not hashTag', () => {
    expect('→#notTag←').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: '→#notTag←'
          }
        ]
      }
    ])
  })

  it('Multiple hashTag', () => {
    expect('#hoge #fuga #piyo').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'hashTag',
            href: 'hoge'
          },
          {
            type: 'plain',
            text: ' '
          },
          {
            type: 'hashTag',
            href: 'fuga'
          },
          {
            type: 'plain',
            text: ' '
          },
          {
            type: 'hashTag',
            href: 'piyo'
          }
        ]
      }
    ])
  })
})
