import * as fs from 'fs'
import parse from '../src'

// const fs = require('fs')
// const parse = require('../src')

describe('parser', () => {
  it('/help/Syntax', () => {
    const input = fs.readFileSync('./__tests__/input.txt').toString()
    const answer = JSON.parse(fs.readFileSync('./__tests__/answer.json').toString())
    expect(parse(input)).toEqual(answer)
  })
})
