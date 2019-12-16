/* global describe it expect */
/* eslint-disable no-tabs, no-irregular-whitespace */

import '../jest-setup'

describe('Table', () => {
  it('Simple table', () => {
    expect(`table:hello
${'\t'}1${'\t'}2${'\t'}3
${'\t'}1 ${'\t'}2 ${'\t'}3
${'\t'}------${'\t'}------${'\t'}------
${'\t'}a${'\t'}b${'\t'}c`).toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Bulleted table', () => {
    expect(` table:bulleted
 ${'\t'}1${'\t'}2${'\t'}3
 ${'\t'}1 ${'\t'}2 ${'\t'}3
 ${'\t'}------${'\t'}------${'\t'}------
 ${'\t'}a${'\t'}b${'\t'}c`).toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Table with empty cells', () => {
    expect(`table:${' '}
${'\t'} ${'\t'}　${'\t'}${'  '}
${'\t'}${'\t'}${'\t'}`).toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Staggered table', () => {
    expect(`table:Staggered
${'\t'}1${'\t'}2${'\t'}3${'\t'}4
${'\t'}1${'\t'}2${'\t'}3
${'\t'}1
${'\t'}1${'\t'}2
${'\t'}`).toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Consecutive table', () => {
    expect(`table:hello
${'\t'}1${'\t'}2${'\t'}3
${'\t'}1 ${'\t'}2 ${'\t'}3
${'\t'}------${'\t'}------${'\t'}------
${'\t'}a${'\t'}b${'\t'}c
table:hello
${'\t'}1${'\t'}2${'\t'}3
${'\t'}1 ${'\t'}2 ${'\t'}3
${'\t'}------${'\t'}------${'\t'}------
${'\t'}a${'\t'}b${'\t'}c`).toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Table with link', () => {
    expect(`table:table with link
${'\t'}[Link]${'\t'}This is [Link]`).toMatchSnapshotWhenParsing({ hasTitle: false })
  })
})
