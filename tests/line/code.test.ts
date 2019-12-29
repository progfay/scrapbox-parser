describe('code', () => {
  it('Simple code with backquote', () => {
    expect('`Simple code`').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Simple code with $', () => {
    expect('$ Simple code').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Empty code with backquote', () => {
    expect('``').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('`$` is not code', () => {
    expect('$').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('`$ ` is not code', () => {
    expect('$ ').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('`$s` is not code', () => {
    expect('$not code').toMatchSnapshotWhenParsing({ hasTitle: false })
  })
})
