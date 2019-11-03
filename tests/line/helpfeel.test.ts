/* global describe it expect */

describe('helpfeel', () => {
  it('Simple helpfeel', () => {
    expect('? Simple helpfeel').toMatchSnapshotWhenParsing()
  })

  it('No head `?` is not helpfeel', () => {
    expect('a ? not helpfeel').toMatchSnapshotWhenParsing()
  })

  it('Quoted ? is not helpfeel', () => {
    expect('> ? Quoted').toMatchSnapshotWhenParsing()
  })
})
