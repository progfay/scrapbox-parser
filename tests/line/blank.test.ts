/* global describe it expect */
/* eslint-disable no-irregular-whitespace */

import '../jest-setup'

describe('blank', () => {
  it('Simple half-space blank', () => {
    expect('[ ]').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'blank',
            text: ' '
          }
        ]
      }
    ])
  })

  it('Simple double-byte space blank', () => {
    expect('[　]').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'blank',
            text: '　'
          }
        ]
      }
    ])
  })

  it('Simple tab blank', () => {
    expect('[\t]').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'blank',
            text: '\t'
          }
        ]
      }
    ])
  })

  it('Multi char blank', () => {
    expect('[ 　 \t　\t ]').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'blank',
            text: ' 　 \t　\t '
          }
        ]
      }
    ])
  })

  it('Blank in the sentence', () => {
    expect('sentence[ ]sentence').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: 'sentence'
          },
          {
            type: 'blank',
            text: ' '
          },
          {
            type: 'plain',
            text: 'sentence'
          }
        ]
      }
    ])
  })

  it('[] is not blank', () => {
    expect('[]').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: '[]'
          }
        ]
      }
    ])
  })

  it('Blank in the [*** ]', () => {
    expect('[*** [ ]]').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: '[*** '
          },
          {
            type: 'blank',
            text: ' '
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
