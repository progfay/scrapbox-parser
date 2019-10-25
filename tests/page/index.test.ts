/* global describe it expect */

import * as fs from 'fs'
import { parse } from '../../src'

describe('page', () => {
  it('Empty page', () => {
    const input = ''
    expect(parse(input)).toEqual({
      title: 'Untitled',
      blocks: []
    })
  })

  it('https://scrapbox.io/help/Syntax', () => {
    const input = fs.readFileSync('./tests/page/input.txt').toString()
    expect(parse(input)).toMatchSnapshot()
  })
})
