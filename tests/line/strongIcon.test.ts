/* global describe it expect */

describe('strongIcon', () => {
  it('Simple root strong icon', () => {
    expect('[[/icons/+1.icon]]').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'strongIcon',
            pathType: 'root',
            path: '/icons/+1'
          }
        ]
      }
    ])
  })

  it('Simple relative strong icon', () => {
    expect('[[me.icon]]').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'strongIcon',
            pathType: 'relative',
            path: 'me'
          }
        ]
      }
    ])
  })

  it('Multiple icons', () => {
    expect('[[me.icon*3]]').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'strongIcon',
            pathType: 'relative',
            path: 'me'
          },
          {
            type: 'strongIcon',
            pathType: 'relative',
            path: 'me'
          },
          {
            type: 'strongIcon',
            pathType: 'relative',
            path: 'me'
          }
        ]
      }
    ])
  })
})
