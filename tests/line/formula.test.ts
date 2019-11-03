/* global describe it expect */

describe('formula', () => {
  it('Simple formula', () => {
    expect('[$ \\frac{3}{2}^N]').toMatchSnapshotWhenParsing()
  })

  it('Formula includes [] with tail half-space', () => {
    expect('[$ [x] ]').toMatchSnapshotWhenParsing()
  })

  it('Formula includes [] without tail half-space', () => {
    expect('[$ [x]]').toMatchSnapshotWhenParsing()
  })
})
