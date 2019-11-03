/* global describe it expect */

describe('line', () => {
  it('Line that have multi node', () => {
    expect('[Link][Link]').toMatchSnapshotWhenParsing()
  })

  it('Decoration line includes internal link', () => {
    expect('[* [Link]]').toMatchSnapshotWhenParsing()
  })

  it('Decoration line includes internal link', () => {
    expect('[* [https://example.com example]]').toMatchSnapshotWhenParsing()
  })

  it('Multi `]`', () => {
    expect('[* [Link]`code`[Link]]').toMatchSnapshotWhenParsing()
  })
})
