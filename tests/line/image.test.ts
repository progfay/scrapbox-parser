/* global describe it expect */

import { BlockComponentType, convertToBlockComponents } from '../../src/block/BlockComponent'
import { BlockType } from '../../src/block'
import { convertToBlocks } from '../../src/parse'

describe('image', () => {
  it('Simple image', () => {
    const input = `[http://example.com/image.png]
[https://example.com/image.JPG]`
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
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
      },
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
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
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
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
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
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
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
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
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

  it('Gyazo image with link', () => {
    const input = `[https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815 https://example.com]
[https://example.com https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815]
[https://gyazo.com/7057219f5b20ca8afd122945b72453d3 https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815]`
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'image',
            src: 'https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815/thumb/1000',
            link: 'https://example.com'
          }
        ]
      },
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'image',
            src: 'https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815/thumb/1000',
            link: 'https://example.com'
          }
        ]
      },
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'image',
            src: 'https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815/thumb/1000',
            link: 'https://gyazo.com/7057219f5b20ca8afd122945b72453d3'
          }
        ]
      }
    ])
  })
})
