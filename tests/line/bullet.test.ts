/* global describe it expect */

describe('bullet', () => {
  it('Single-byte space indent', () => {
    expect(' Single-byte space').toMatchSnapshotWhenParsing()
  })

  it('Double-byte space indent', () => {
    expect('　Double-byte space').toMatchSnapshotWhenParsing()
  })

  it('Tab indent', () => {
    // eslint-disable-next-line no-tabs
    expect('	Tab').toMatchSnapshotWhenParsing()
  })

  it('Multi lines bullet', () => {
    expect(`no bullet (indent: 0)
 first bullet (indent: 1)
  second bullet (indent: 2)
   third bullet (indent: 3)`).toMatchSnapshotWhenParsing()
  })
})
