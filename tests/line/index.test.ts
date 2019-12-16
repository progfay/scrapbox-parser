/* global describe it expect */

describe('line', () => {
  it('Line that have multi node', () => {
    expect('[Link][Link]').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Decoration line includes internal link', () => {
    expect('[* [Link]]').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Decoration line includes internal link', () => {
    expect('[* [https://example.com example]]').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Multi `]`', () => {
    expect('[* [Link]`code`[Link]]').toMatchSnapshotWhenParsing({ hasTitle: false })
  })
})
