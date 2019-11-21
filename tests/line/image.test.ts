/* global describe it expect */

describe('image', () => {
  it('Simple image', () => {
    expect(`[http://example.com/image.png]
[https://example.com/image.JPG]`).toEqualWhenParsing([
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
    expect('[http://example.com/~!@#$%^&*()_+`-={}\\\'"?,.<>|/画像.jpeg]').toEqualWhenParsing([
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
    expect(`[https://example.com/image.svg https://example.com/]
[https://example.com/ https://example.com/image.GIF]`).toEqualWhenParsing([
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
    expect('[https://example.com/forward.png https://example.com/backward.png]').toEqualWhenParsing([
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
    expect(`[https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815]
[https://i.gyazo.com/0f82099330f378fe4917a1b4a5fe8815]
[https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815/raw]`).toEqualWhenParsing([
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
    expect(`[https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815 https://example.com]
[https://example.com https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815]
[https://gyazo.com/7057219f5b20ca8afd122945b72453d3 https://gyazo.com/0f82099330f378fe4917a1b4a5fe8815]`).toEqualWhenParsing([
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

  it('Image with GET parameters', () => {
    expect('[http://example.com/image.png?key1=value1&key2=value2]').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'image',
            src: 'http://example.com/image.png?key1=value1&key2=value2',
            link: ''
          }
        ]
      }
    ])
  })
})
