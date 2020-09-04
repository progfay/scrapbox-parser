describe('code', () => {
  it('Simple code with backquote', () => {
    expect('`Simple code`').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Empty code with backquote', () => {
    expect('``').toMatchSnapshotWhenParsing({ hasTitle: false })
  })
})
