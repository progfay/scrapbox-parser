describe('Code Block', () => {
  it('Simple code block', () => {
    expect(`code:hello.js
 function () {
   alert(document.location.href)
   console.log("hello")
   // You can also write comments!
 }`).toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Bulleted code block', () => {
    expect(` code:hello.js
  function () {
    alert(document.location.href)
    console.log("hello")
    // You can also write comments!
  }`).toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Code block with bullet', () => {
    expect(` Bullet
 code:hello.js
  function () {
    alert(document.location.href)
    console.log("hello")
    // You can also write comments!
  }
 Bullet`).toMatchSnapshotWhenParsing({ hasTitle: false })
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
 }`).toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Code block with parentheses', () => {
    expect(`code:hello.mjs(js)
 export default function () {
   alert(document.location.href)
   console.log("hello")
   // You can also write comments!
 }`).toMatchSnapshotWhenParsing({ hasTitle: false })
  })
})
