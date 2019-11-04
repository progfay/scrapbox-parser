/* global describe it expect */

describe('line', () => {
  it('Line that have multi node', () => {
    expect('[Link][Link]').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'link',
            pathType: 'relative',
            href: 'Link',
            content: ''
          },
          {
            type: 'link',
            pathType: 'relative',
            href: 'Link',
            content: ''
          }
        ]
      }
    ])
  })

  it('Decoration line includes internal link', () => {
    expect('[* [Link]]').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'decoration',
            decos: ['*-1'],
            nodes: [
              {
                type: 'link',
                pathType: 'relative',
                href: 'Link',
                content: ''
              }
            ]
          }
        ]
      }
    ])
  })

  it('Decoration line includes internal link', () => {
    expect('[* [https://example.com example]]').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'decoration',
            decos: ['*-1'],
            nodes: [
              {
                type: 'link',
                pathType: 'absolute',
                href: 'https://example.com',
                content: 'example'
              }
            ]
          }
        ]
      }
    ])
  })

  it('Multi `]`', () => {
    expect('[* [Link]`code`[Link]]').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'decoration',
            decos: ['*-1'],
            nodes: [
              {
                type: 'plain',
                text: '[Link'
              }
            ]
          },
          {
            type: 'code',
            text: 'code'
          },
          {
            type: 'link',
            pathType: 'relative',
            href: 'Link',
            content: ''
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
