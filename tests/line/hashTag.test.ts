/* global describe it expect */

describe('hashTag', () => {
  it('Simple hashTag', () => {
    expect('#tag').toMatchSnapshotWhenParsing()
  })

  it('Only `#` is not hashTag', () => {
    expect('#').toMatchSnapshotWhenParsing()
  })

  it('HashTag includes `#`', () => {
    expect('#hash#Tag').toMatchSnapshotWhenParsing()
  })

  it('HashTag in sentence with spaces', () => {
    expect('This is a #tag .').toMatchSnapshotWhenParsing()
  })

  it('HashTag in sentence without spaces is not hashTag', () => {
    expect('→#notTag←').toMatchSnapshotWhenParsing()
  })

  it('Multiple hashTag', () => {
    expect('#hoge #fuga #piyo').toMatchSnapshotWhenParsing()
  })
})
