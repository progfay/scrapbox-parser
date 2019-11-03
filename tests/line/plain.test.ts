/* global describe it expect */

describe('plain', () => {
  it('Simple plain text', () => {
    expect('Plain text').toMatchSnapshotWhenParsing()
  })

  it('Blank line', () => {
    expect('').toMatchSnapshotWhenParsing()
  })

  it('Keep tail space', () => {
    expect('Tail space ->  ').toMatchSnapshotWhenParsing()
  })
})
