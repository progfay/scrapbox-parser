/* global describe it expect */

describe('helpfeel', () => {
  it('Simple helpfeel', () => {
    expect('? Simple helpfeel').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('No head `?` is not helpfeel', () => {
    expect('a ? not helpfeel').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Quoted ? is not helpfeel', () => {
    expect('> ? Quoted').toMatchSnapshotWhenParsing({ hasTitle: false })
  })
})
