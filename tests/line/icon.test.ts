/* global describe it expect */

describe('icon', () => {
  it('Simple root icon', () => {
    expect('[/icons/+1.icon]').toMatchSnapshotWhenParsing()
  })

  it('Simple relative icon', () => {
    expect('[me.icon]').toMatchSnapshotWhenParsing()
  })

  it('Multiple icons', () => {
    expect('[me.icon*3]').toMatchSnapshotWhenParsing()
  })
})
