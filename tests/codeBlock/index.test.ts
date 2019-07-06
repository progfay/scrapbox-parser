/* global describe it expect */

import { BlockComponentType, convertToBlockComponents } from '../../src/block/BlockComponent'
import { BlockType } from '../../src/block'
import { convertToBlocks } from '../../src/parse'

describe('Code Block', () => {
  it('Simple code block', () => {
    const input = `code:hello.js
 function () {
   alert(document.location.href)
   console.log("hello")
   // You can also write comments!
 }`
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'codeBlock',
        fileName: 'hello.js',
        content: 'function () {\n  alert(document.location.href)\n  console.log("hello")\n  // You can also write comments!\n}'
      }
    ])
  })

  it('Bulleted code block', () => {
    const input = ` code:hello.js
  function () {
    alert(document.location.href)
    console.log("hello")
    // You can also write comments!
  }`
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 1,
        type: 'codeBlock',
        fileName: 'hello.js',
        content: 'function () {\n  alert(document.location.href)\n  console.log("hello")\n  // You can also write comments!\n}'
      }
    ])
  })

  it('Code block with bullet', () => {
    const input = ` Bullet
 code:hello.js
  function () {
    alert(document.location.href)
    console.log("hello")
    // You can also write comments!
  }
 Bullet`
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 1,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: 'Bullet'
          }
        ]
      },
      {
        indent: 1,
        type: 'codeBlock',
        fileName: 'hello.js',
        content: 'function () {\n  alert(document.location.href)\n  console.log("hello")\n  // You can also write comments!\n}'
      },
      {
        indent: 1,
        type: 'line',
        nodes: [
          {
            type: 'plain',
            text: 'Bullet'
          }
        ]
      }
    ])
  })

  it('Consecutive code blocks', () => {
    const input = `code:hello.js
 function () {
   alert(document.location.href)
   console.log("hello")
   // You can also write comments!
 }
code:hello.js
 function () {
   alert(document.location.href)
   console.log("hello")
   // You can also write comments!
 }`
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'codeBlock',
        fileName: 'hello.js',
        content: 'function () {\n  alert(document.location.href)\n  console.log("hello")\n  // You can also write comments!\n}'
      },
      {
        indent: 0,
        type: 'codeBlock',
        fileName: 'hello.js',
        content: 'function () {\n  alert(document.location.href)\n  console.log("hello")\n  // You can also write comments!\n}'
      }
    ])
  })
})
