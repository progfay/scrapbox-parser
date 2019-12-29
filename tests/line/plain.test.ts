describe('plain', () => {
  it('Simple plain text', () => {
    expect('Plain text').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Blank line', () => {
    expect('').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Keep tail space', () => {
    expect('Tail space ->  ').toMatchSnapshotWhenParsing({ hasTitle: false })
  })
})
