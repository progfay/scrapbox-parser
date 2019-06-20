/* global describe, it, expect */

const fs = require('fs')
const parse = require('../index.js')

describe('parser', () => {
  it('/help/Syntax', () => {
    const input = fs.readFileSync('./test/input.txt')
    const answer = JSON.parse(fs.readFileSync('./test/answer.json'))
    expect(parse(input)).toEqual(answer)
  })
})
