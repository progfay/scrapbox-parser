/* global describe it expect */

describe('strongImage', () => {
  it('Simple strong image', () => {
    expect(`[[http://example.com/image.png]]
[[https://example.com/image.JPG]]
[[https://example.com/image.svg]]
[[https://example.com/image.GIF]]`).toEqualWhenParsing([
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
    expect('[[http://example.com/~!@#$%^&*()_+`-={}\\\'"?,.<>|/画像.jpeg]]').toEqualWhenParsing([
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
    expect('[[https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815]]').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'strongImage',
            src: 'https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815/thumb/1000'
          }
        ]
      }
    ])
  })
})
