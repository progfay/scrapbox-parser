/* global describe it expect */
/* eslint-disable no-irregular-whitespace */

describe('blank', () => {
  it('Simple half-space blank', () => {
    expect('[ ]').toMatchSnapshotWhenParsing()
  })

  it('Simple double-byte space blank', () => {
    expect('[　]').toMatchSnapshotWhenParsing()
  })

  it('Simple tab blank', () => {
    expect('[\t]').toMatchSnapshotWhenParsing()
  })

  it('Multi char blank', () => {
    expect('[ 　 \t　\t ]').toMatchSnapshotWhenParsing()
  })

  it('Blank in the sentence', () => {
    expect('sentence[ ]sentence').toMatchSnapshotWhenParsing()
  })

  it('[] is not blank', () => {
    expect('[]').toMatchSnapshotWhenParsing()
  })

  it('Blank in the [*** ]', () => {
    expect('[*** [ ]]').toMatchSnapshotWhenParsing()
  })
})
