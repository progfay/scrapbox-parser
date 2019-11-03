/* global describe it expect */

describe('strongIcon', () => {
  it('Simple root strong icon', () => {
    expect('[[/icons/+1.icon]]').toMatchSnapshotWhenParsing()
  })

  it('Simple relative strong icon', () => {
    expect('[[me.icon]]').toMatchSnapshotWhenParsing()
  })

  it('Multiple icons', () => {
    expect('[[me.icon*3]]').toMatchSnapshotWhenParsing()
  })
})
