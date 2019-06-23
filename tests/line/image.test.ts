/* global describe it expect */

import { BlockComponentType, convertToBlockComponents } from '../../src/block/BlockComponent'
import { BlockType } from '../../src/block'
import { convertToBlocks } from '../../src/parse'

describe('image', () => {
  it('Simple HTTP png image', () => {
    const input = '[http://example.com/image.png]'
    const blockComponents: Array<BlockComponentType> = convertToBlockComponents(input)
    const blocks: Array<BlockType> = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'image',
            src: 'http://example.com/image.png',
            link: ''
          }
        ]
      }
    ])
  })

  it('Simple HTTPS JPG image', () => {
    const input = '[https://example.com/image.JPG]'
    const blockComponents: Array<BlockComponentType> = convertToBlockComponents(input)
    const blocks: Array<BlockType> = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'image',
            src: 'https://example.com/image.JPG',
            link: ''
          }
        ]
      }
    ])
  })

  it('HTTP jpeg image with special and japanese chars', () => {
    const input = '[http://example.com/~!@#$%^&*()_+`-={}\\\'"?,.<>|/画像.jpeg]'
    const blockComponents: Array<BlockComponentType> = convertToBlockComponents(input)
    const blocks: Array<BlockType> = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'image',
            src: 'http://example.com/~!@#$%^&*()_+`-={}\\\'"?,.<>|/画像.jpeg',
            link: ''
          }
        ]
      }
    ])
  })

  it('HTTPS svg and GIF image with link', () => {
    const input = `[https://example.com/image.svg https://example.com/]
[https://example.com/ https://example.com/image.GIF]`
    const blockComponents: Array<BlockComponentType> = convertToBlockComponents(input)
    const blocks: Array<BlockType> = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'image',
            src: 'https://example.com/image.svg',
            link: 'https://example.com/'
          }
        ]
      },
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'image',
            src: 'https://example.com/image.GIF',
            link: 'https://example.com/'
          }
        ]
      }
    ])
  })

  it('Image with double image link', () => {
    const input = '[https://example.com/forward.png https://example.com/backward.png]'
    const blockComponents: Array<BlockComponentType> = convertToBlockComponents(input)
    const blocks: Array<BlockType> = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'image',
            src: 'https://example.com/backward.png',
            link: 'https://example.com/forward.png'
          }
        ]
      }
    ])
  })

  it('Image with double image link', () => {
    const input = '[https://example.com/forward.png https://example.com/backward.png]'
    const blockComponents: Array<BlockComponentType> = convertToBlockComponents(input)
    const blocks: Array<BlockType> = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'image',
            src: 'https://example.com/backward.png',
            link: 'https://example.com/forward.png'
          }
        ]
      }
    ])
  })

  it('Gyazo image', () => {
    const input = `[https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815]
[https://i.gyazo.com/0f82099330f378fe4917a1b4a5fe8815]
[https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815/raw]`
    const blockComponents: Array<BlockComponentType> = convertToBlockComponents(input)
    const blocks: Array<BlockType> = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'image',
            src: 'https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815/thumb/1000',
            link: ''
          }
        ]
      },
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'image',
            src: 'https://i.gyazo.com/0f82099330f378fe4917a1b4a5fe8815/thumb/1000',
            link: ''
          }
        ]
      },
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'image',
            src: 'https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815/raw',
            link: ''
          }
        ]
      }
    ])
  })
})
