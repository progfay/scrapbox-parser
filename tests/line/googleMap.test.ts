/* global describe it expect */

describe('googleMap', () => {
  it('Simple google map with NE', () => {
    expect('[N35.6812362,E139.7649361]').toMatchSnapshotWhenParsing()
  })

  it('Simple google map with SW', () => {
    expect('[S13.70533,W69.6533372]').toMatchSnapshotWhenParsing()
  })

  it('Simple google map with zoom', () => {
    expect('[N35.6812362,E139.7649361,Z14]').toMatchSnapshotWhenParsing()
  })

  it('Simple google map with place on left', () => {
    expect('[東京駅 N35.6812362,E139.7649361,Z14]').toMatchSnapshotWhenParsing()
  })

  it('Simple google map with place on right', () => {
    expect('[N35.6812362,E139.7649361,Z14 東京駅]').toMatchSnapshotWhenParsing()
  })
})
