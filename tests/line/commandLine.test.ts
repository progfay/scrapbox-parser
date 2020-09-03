describe('commandLine', () => {
  it('Simple command with $', () => {
    expect('$ command').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Simple command with %', () => {
    expect('% command').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('`$` is not command', () => {
    expect('$').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('`$ ` is not command', () => {
    expect('$ ').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('`$s` is not command', () => {
    expect('$not command').toMatchSnapshotWhenParsing({ hasTitle: false })
  })
})
