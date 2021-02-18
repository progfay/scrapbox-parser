describe('strong', () => {
  it('Simple strong', () => {
    expect('[[Simple strong]]').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('[[]] is not strong', () => {
    expect('[[]]').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Decoration in Strong notation', () => {
    expect('[[[! deco]]]').toMatchSnapshotWhenParsing({ hasTitle: false })
  })
})
