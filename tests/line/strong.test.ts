/* global describe it expect */

describe('strong', () => {
  it('Simple strong', () => {
    expect('[[Simple strong]]').toMatchSnapshotWhenParsing()
  })

  it('[[]] is not strong', () => {
    expect('[[]]').toMatchSnapshotWhenParsing()
  })
})
