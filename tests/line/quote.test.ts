/* global describe it expect */

describe('quote', () => {
  it('Simple quote', () => {
    expect('> Simple quote').toMatchSnapshotWhenParsing()
  })

  it('Empty quote', () => {
    expect('>').toMatchSnapshotWhenParsing()
  })
})
