/* global describe it expect */

describe('strongImage', () => {
  it('Simple strong image', () => {
    expect(`[[http://example.com/image.png]]
[[https://example.com/image.JPG]]
[[https://example.com/image.svg]]
[[https://example.com/image.GIF]]`).toMatchSnapshotWhenParsing()
  })

  it('HTTP jpeg strong image with special and japanese chars', () => {
    expect('[[http://example.com/~!@#$%^&*()_+`-={}\\\'"?,.<>|/画像.jpeg]]').toMatchSnapshotWhenParsing()
  })

  it('Gyazo image', () => {
    expect('[[https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815]]').toMatchSnapshotWhenParsing()
  })
})
