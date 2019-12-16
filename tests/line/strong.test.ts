/* global describe it expect */

describe('strong', () => {
  it('Simple strong', () => {
    expect('[[Simple strong]]').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('[[]] is not strong', () => {
    expect('[[]]').toMatchSnapshotWhenParsing({ hasTitle: false })
  })
})
