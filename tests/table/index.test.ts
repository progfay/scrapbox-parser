/* global describe it expect */
/* eslint-disable no-tabs, no-irregular-whitespace */

import '../jest-setup'
import { LineNodeType } from '../../src/block/node'

const defaultTableCells: LineNodeType[][][] = [
  [
    [
      {
        type: 'plain',
        text: '1'
      }
    ],
    [
      {
        type: 'plain',
        text: '2'
      }
    ],
    [
      {
        type: 'plain',
        text: '3'
      }
    ]
  ],
  [
    [{
      type: 'plain',
      text: '1 '
    }],
    [
      {
        type: 'plain',
        text: '2 '
      }
    ],
    [
      {
        type: 'plain',
        text: '3'
      }
    ]
  ],
  [
    [
      {
        type: 'plain',
        text: '------'
      }
    ],
    [
      {
        type: 'plain',
        text: '------'
      }
    ],
    [
      {
        type: 'plain',
        text: '------'
      }
    ]
  ],
  [
    [
      {
        type: 'plain',
        text: 'a'
      }
    ],
    [
      {
        type: 'plain',
        text: 'b'
      }
    ],
    [
      {
        type: 'plain',
        text: 'c'
      }
    ]
  ]
]

describe('Table', () => {
  it('Simple table', () => {
    expect(`table:hello
${'\t'}1${'\t'}2${'\t'}3
${'\t'}1 ${'\t'}2 ${'\t'}3
${'\t'}------${'\t'}------${'\t'}------
${'\t'}a${'\t'}b${'\t'}c`).toEqualWhenParsing([
      {
        indent: 0,
        type: 'table',
        fileName: 'hello',
        cells: defaultTableCells
      }
    ])
  })

  it('Bulleted table', () => {
    expect(` table:bulleted
 ${'\t'}1${'\t'}2${'\t'}3
 ${'\t'}1 ${'\t'}2 ${'\t'}3
 ${'\t'}------${'\t'}------${'\t'}------
 ${'\t'}a${'\t'}b${'\t'}c`).toEqualWhenParsing([
      {
        indent: 1,
        type: 'table',
        fileName: 'bulleted',
        cells: defaultTableCells
      }
    ])
  })

  it('Table with empty cells', () => {
    expect(`table:${' '}
${'\t'} ${'\t'}　${'\t'}${'  '}
${'\t'}${'\t'}${'\t'}`).toEqualWhenParsing([
      {
        indent: 0,
        type: 'table',
        fileName: ' ',
        cells: [
          [
            [
              {
                type: 'plain',
                text: ' '
              }
            ],
            [
              {
                type: 'plain',
                text: '　'
              }
            ],
            [
              {
                type: 'plain',
                text: '  '
              }
            ]
          ],
          [
            [],
            [],
            []
          ]
        ]
      }
    ])
  })

  it('Staggered table', () => {
    expect(`table:Staggered
${'\t'}1${'\t'}2${'\t'}3${'\t'}4
${'\t'}1${'\t'}2${'\t'}3
${'\t'}1
${'\t'}1${'\t'}2
${'\t'}`).toEqualWhenParsing([
      {
        indent: 0,
        type: 'table',
        fileName: 'Staggered',
        cells: [
          [
            [
              {
                type: 'plain',
                text: '1'
              }
            ],
            [
              {
                type: 'plain',
                text: '2'
              }
            ],
            [
              {
                type: 'plain',
                text: '3'
              }
            ],
            [
              {
                type: 'plain',
                text: '4'
              }
            ]
          ],
          [
            [
              {
                type: 'plain',
                text: '1'
              }
            ],
            [
              {
                type: 'plain',
                text: '2'
              }
            ],
            [
              {
                type: 'plain',
                text: '3'
              }
            ]
          ],
          [
            [
              {
                type: 'plain',
                text: '1'
              }
            ]
          ],
          [
            [
              {
                type: 'plain',
                text: '1'
              }
            ],
            [
              {
                type: 'plain',
                text: '2'
              }
            ]
          ],
          [
            []
          ]
        ]
      }
    ])
  })

  it('Consecutive table', () => {
    expect(`table:hello
${'\t'}1${'\t'}2${'\t'}3
${'\t'}1 ${'\t'}2 ${'\t'}3
${'\t'}------${'\t'}------${'\t'}------
${'\t'}a${'\t'}b${'\t'}c
table:hello
${'\t'}1${'\t'}2${'\t'}3
${'\t'}1 ${'\t'}2 ${'\t'}3
${'\t'}------${'\t'}------${'\t'}------
${'\t'}a${'\t'}b${'\t'}c`).toEqualWhenParsing([
      {
        indent: 0,
        type: 'table',
        fileName: 'hello',
        cells: defaultTableCells
      },
      {
        indent: 0,
        type: 'table',
        fileName: 'hello',
        cells: defaultTableCells
      }
    ])
  })

  it('Table with link', () => {
    expect(`table:table with link
${'\t'}[Link]${'\t'}This is [Link]`).toEqualWhenParsing([
      {
        indent: 0,
        type: 'table',
        fileName: 'table with link',
        cells: [
          [
            [
              {
                type: 'link',
                pathType: 'relative',
                href: 'Link',
                content: ''
              }
            ],
            [
              {
                type: 'plain',
                text: 'This is '
              },
              {
                type: 'link',
                pathType: 'relative',
                href: 'Link',
                content: ''
              }
            ]
          ]
        ]
      }
    ])
  })
})
