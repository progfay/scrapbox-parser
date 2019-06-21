/* global describe it expect */

import * as fs from 'fs'
import parse from '../../src'

describe('page', () => {
  it('https://scrapbox.io/help/Syntax', () => {
    const input = fs.readFileSync('./__tests__/input.txt').toString()
    const answer = JSON.parse(fs.readFileSync('./__tests__/answer.json').toString())
    expect(parse(input)).toEqual(answer)
  })
})
