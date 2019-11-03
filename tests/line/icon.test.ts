/* global describe it expect */

import '../jest-setup'

describe('icon', () => {
  it('Simple root icon', () => {
    expect('[/icons/+1.icon]').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'icon',
            pathType: 'root',
            path: '/icons/+1'
          }
        ]
      }
    ])
  })

  it('Simple relative icon', () => {
    expect('[me.icon]').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'icon',
            pathType: 'relative',
            path: 'me'
          }
        ]
      }
    ])
  })

  it('Multiple icons', () => {
    expect('[me.icon*3]').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'icon',
            pathType: 'relative',
            path: 'me'
          },
          {
            type: 'icon',
            pathType: 'relative',
            path: 'me'
          },
          {
            type: 'icon',
            pathType: 'relative',
            path: 'me'
          }
        ]
      }
    ])
  })
})
