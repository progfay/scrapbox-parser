/* global describe it expect */
import '../jest-setup'

describe('link', () => {
  it('Simple absolute link', () => {
    expect('https://example.com/').toMatchSnapshotWhenParsing()
  })

  it('Simple absolute link with bracket', () => {
    expect('[https://example.com/]').toMatchSnapshotWhenParsing()
  })

  it('Simple root link', () => {
    expect('[/project/page]').toMatchSnapshotWhenParsing()
  })

  it('Simple relative link', () => {
    expect('[page]').toMatchSnapshotWhenParsing()
  })

  it('Link with content', () => {
    expect(`[https://example.com/   Example]
[Example   https://example.com/]
[https://left.com/ center https://right.com/]`).toMatchSnapshotWhenParsing()
  })

  it('Root and relative link path can include space', () => {
    expect(`[page name]
[/project/page name]`).toMatchSnapshotWhenParsing()
  })

  it('Link with link', () => {
    expect('[https://example.com https://example.com]').toMatchSnapshotWhenParsing()
  })

  it('Link with GET parameters', () => {
    expect('[http://example.com?key1=value1&key2=value2]').toMatchSnapshotWhenParsing()
  })
})
