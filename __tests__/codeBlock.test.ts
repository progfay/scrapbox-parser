/* global describe it expect */

import { LineComponentType } from '../src/types'
import convertToLineComponent from '../src/convertToLineComponents'
import parseToLines from '../src/parseToLines'

describe('Code Block', () => {
  it('Simple code block', () => {
    const input = `code:hello.js
 function () {
   alert(document.location.href)
   console.log("hello")
   // You can also write comments!
 }`
    const lineComponents: Array<LineComponentType> = convertToLineComponent(input)
    expect(parseToLines(lineComponents)).toEqual([
      {
        indent: 0,
        nodes: [
          {
            type: 'codeBlock',
            fileName: 'hello.js',
            content: 'function () {\n  alert(document.location.href)\n  console.log("hello")\n  // You can also write comments!\n}'
          }
        ]
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
    const lineComponents: Array<LineComponentType> = convertToLineComponent(input)
    expect(parseToLines(lineComponents)).toEqual([
      {
        indent: 1,
        nodes: [
          {
            type: 'codeBlock',
            fileName: 'hello.js',
            content: 'function () {\n  alert(document.location.href)\n  console.log("hello")\n  // You can also write comments!\n}'
          }
        ]
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
    const lineComponents: Array<LineComponentType> = convertToLineComponent(input)
    expect(parseToLines(lineComponents)).toEqual([
      {
        indent: 1,
        nodes: [
          {
            type: 'plain',
            text: 'Bullet'
          }
        ]
      },
      {
        indent: 1,
        nodes: [
          {
            type: 'codeBlock',
            fileName: 'hello.js',
            content: 'function () {\n  alert(document.location.href)\n  console.log("hello")\n  // You can also write comments!\n}'
          }
        ]
      },
      {
        indent: 1,
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
    const lineComponents: Array<LineComponentType> = convertToLineComponent(input)
    expect(parseToLines(lineComponents)).toEqual([
      {
        indent: 0,
        nodes: [
          {
            type: 'codeBlock',
            fileName: 'hello.js',
            content: 'function () {\n  alert(document.location.href)\n  console.log("hello")\n  // You can also write comments!\n}'
          }
        ]
      },
      {
        indent: 0,
        nodes: [
          {
            type: 'codeBlock',
            fileName: 'hello.js',
            content: 'function () {\n  alert(document.location.href)\n  console.log("hello")\n  // You can also write comments!\n}'
          }
        ]
      }
    ])
  })
})
