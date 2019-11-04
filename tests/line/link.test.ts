/* global describe it expect */

describe('link', () => {
  it('Simple absolute link', () => {
    expect('https://example.com/').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'link',
            pathType: 'absolute',
            href: 'https://example.com/',
            content: ''
          }
        ]
      }
    ])
  })

  it('Simple absolute link with bracket', () => {
    expect('[https://example.com/]').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'link',
            pathType: 'absolute',
            href: 'https://example.com/',
            content: ''
          }
        ]
      }
    ])
  })

  it('Simple root link', () => {
    expect('[/project/page]').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'link',
            pathType: 'root',
            href: '/project/page',
            content: ''
          }
        ]
      }
    ])
  })

  it('Simple relative link', () => {
    expect('[page]').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'link',
            pathType: 'relative',
            href: 'page',
            content: ''
          }
        ]
      }
    ])
  })

  it('Link with content', () => {
    expect(`[https://example.com/   Example]
[Example   https://example.com/]
[https://left.com/ center https://right.com/]`).toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'link',
            pathType: 'absolute',
            href: 'https://example.com/',
            content: 'Example'
          }
        ]
      },
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'link',
            pathType: 'absolute',
            href: 'https://example.com/',
            content: 'Example'
          }
        ]
      },
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'link',
            pathType: 'absolute',
            href: 'https://left.com/',
            content: 'center https://right.com/'
          }
        ]
      }
    ])
  })

  it('Root and relative link path can include space', () => {
    expect(`[page name]
[/project/page name]`).toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'link',
            pathType: 'relative',
            href: 'page name',
            content: ''
          }
        ]
      },
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'link',
            pathType: 'root',
            href: '/project/page name',
            content: ''
          }
        ]
      }
    ])
  })

  it('Link with link', () => {
    expect('[https://example.com https://example.com]').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'link',
            pathType: 'absolute',
            href: 'https://example.com',
            content: 'https://example.com'
          }
        ]
      }
    ])
  })
})
