describe('link', () => {
  it('Simple absolute link', () => {
    expect('https://example.com/').toMatchSnapshotWhenParsing({
      hasTitle: false
    })
  })

  it('Simple absolute link with ahead non-space character', () => {
    expect('ahttps://example.com/').toMatchSnapshotWhenParsing({
      hasTitle: false
    })
  })

  it('Simple absolute link with bracket', () => {
    expect('[https://example.com/]').toMatchSnapshotWhenParsing({
      hasTitle: false
    })
  })

  it('Simple root link', () => {
    expect('[/project/page]').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Simple relative link', () => {
    expect('[page]').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Link with content', () => {
    expect(`[https://example.com/   Example]
[Example   https://example.com/]
[https://left.com/ center https://right.com/]`).toMatchSnapshotWhenParsing({
      hasTitle: false
    })
  })

  it('Root and relative link path can include space', () => {
    expect(`[page name]
[/project/page name]`).toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Link with link', () => {
    expect('[https://example.com https://example.com]').toMatchSnapshotWhenParsing({
      hasTitle: false
    })
  })

  it('Link with GET parameters', () => {
    expect('[http://example.com?key1=value1&key2=value2]').toMatchSnapshotWhenParsing({
      hasTitle: false
    })
  })
})
