describe('strongIcon', () => {
  it('Simple root strong icon', () => {
    expect('[[/icons/+1.icon]]').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Simple relative strong icon', () => {
    expect('[[me.icon]]').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Multiple icons', () => {
    expect('[[me.icon*3]]').toMatchSnapshotWhenParsing({ hasTitle: false })
  })
})
