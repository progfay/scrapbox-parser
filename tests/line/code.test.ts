/* global describe it expect */

describe('code', () => {
  it('Simple code with backquote', () => {
    expect('`Simple code`').toMatchSnapshotWhenParsing()
  })

  it('Simple code with $', () => {
    expect('$ Simple code').toMatchSnapshotWhenParsing()
  })

  it('Empty code with backquote', () => {
    expect('``').toMatchSnapshotWhenParsing()
  })

  it('`$` is not code', () => {
    expect('$').toMatchSnapshotWhenParsing()
  })

  it('`$ ` is not code', () => {
    expect('$ ').toMatchSnapshotWhenParsing()
  })

  it('`$s` is not code', () => {
    expect('$not code').toMatchSnapshotWhenParsing()
  })
})
