/* global describe it expect */

import '../jest-setup'

describe('Code Block', () => {
  it('Simple code block', () => {
    expect(`code:hello.js
 function () {
   alert(document.location.href)
   console.log("hello")
   // You can also write comments!
 }`).toEqualWhenParsing([
      {
        indent: 0,
        type: 'codeBlock',
        fileName: 'hello.js',
        content: 'function () {\n  alert(document.location.href)\n  console.log("hello")\n  // You can also write comments!\n}'
      }
    ])
  })

  it('Bulleted code block', () => {
    expect(` code:hello.js
  function () {
    alert(document.location.href)
    console.log("hello")
    // You can also write comments!
  }`).toEqualWhenParsing([
      {
        indent: 1,
        type: 'codeBlock',
        fileName: 'hello.js',
        content: 'function () {\n  alert(document.location.href)\n  console.log("hello")\n  // You can also write comments!\n}'
      }
    ])
  })

  it('Code block with bullet', () => {
    expect(` Bullet
 code:hello.js
  function () {
    alert(document.location.href)
    console.log("hello")
    // You can also write comments!
  }
 Bullet`).toEqualWhenParsing([
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
    expect(`code:hello.js
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
 }`).toEqualWhenParsing([
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
