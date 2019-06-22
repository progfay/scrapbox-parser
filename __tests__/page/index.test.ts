/* global describe it expect */

import * as fs from 'fs'
import { BlockComponentType, convertToBlockComponents } from '../../src/block/BlockComponent'
import { BlockType } from '../../src/block'
import { convertToBlocks } from '../../src/parse'

describe('page', () => {
  it('https://scrapbox.io/help/Syntax', () => {
    const input = fs.readFileSync('./__tests__/page/input.txt').toString()
    const blockComponents: Array<BlockComponentType> = convertToBlockComponents(input)
    const blocks: Array<BlockType> = convertToBlocks(blockComponents)
    const answer = JSON.parse(fs.readFileSync('./__tests__/page/answer.json').toString())
    expect(blocks).toEqual(answer)
  })
})
