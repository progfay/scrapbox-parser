/* global describe it expect */

import { BlockComponentType, convertToBlockComponents } from '../../src/block/BlockComponent'
import { BlockType } from '../../src/block'
import { convertToBlocks } from '../../src/parse'

describe('strongImage', () => {
  it('Simple strong image', () => {
    const input = `[[http://example.com/image.png]]
[[https://example.com/image.JPG]]
[[https://example.com/image.svg]]
[[https://example.com/image.GIF]]`
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'strongImage',
            src: 'http://example.com/image.png'
          }
        ]
      },
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'strongImage',
            src: 'https://example.com/image.JPG'
          }
        ]
      },
            {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'strongImage',
            src: 'https://example.com/image.svg'
          }
        ]
      },
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'strongImage',
            src: 'https://example.com/image.GIF'
          }
        ]
      }
    ])
  })

  it('HTTP jpeg strong image with special and japanese chars', () => {
    const input = '[[http://example.com/~!@#$%^&*()_+`-={}\\\'"?,.<>|/画像.jpeg]]'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'strongImage',
            src: 'http://example.com/~!@#$%^&*()_+`-={}\\\'"?,.<>|/画像.jpeg'
          }
        ]
      }
    ])
  })

  it('Gyazo image', () => {
    const input = '[[https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815]]'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'strongImage',
            src: 'https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815/thumb/1000',
          }
        ]
      }
    ])
  })
})
