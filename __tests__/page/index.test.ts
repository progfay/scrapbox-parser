/* global describe it expect */

import * as fs from 'fs'
import parse from '../../src'

describe('page', () => {
  it('Empty page', () => {
    const input = ''
    expect(parse(input)).toEqual({
      title: 'Untitled',
      blocks: []
    })
  })

  it('https://scrapbox.io/help/Syntax', () => {
    const input = fs.readFileSync('./__tests__/page/input.txt').toString()
    const answer = JSON.parse(fs.readFileSync('./__tests__/page/answer.json').toString())
    expect(parse(input)).toEqual(answer)
  })
})
