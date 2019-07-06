/* global describe it expect */
/* eslint-disable no-tabs, no-irregular-whitespace */

import { BlockComponentType, convertToBlockComponents } from '../../src/block/BlockComponent'
import { BlockType } from '../../src/block'
import { convertToBlocks } from '../../src/parse'

const defaultTableCells = [
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
    const input = `table:hello
${'\t'}1${'\t'}2${'\t'}3
${'\t'}1 ${'\t'}2 ${'\t'}3
${'\t'}------${'\t'}------${'\t'}------
${'\t'}a${'\t'}b${'\t'}c`
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'table',
        fileName: 'hello',
        cells: defaultTableCells
      }
    ])
  })

  it('Bulleted table', () => {
    const input = ` table:bulleted
 ${'\t'}1${'\t'}2${'\t'}3
 ${'\t'}1 ${'\t'}2 ${'\t'}3
 ${'\t'}------${'\t'}------${'\t'}------
 ${'\t'}a${'\t'}b${'\t'}c`
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 1,
        type: 'table',
        fileName: 'bulleted',
        cells: defaultTableCells
      }
    ])
  })

  it('Table with empty cells', () => {
    const input = `table:${' '}
${'\t'} ${'\t'}　${'\t'}${'  '}
${'\t'}${'\t'}${'\t'}`
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
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
    const input = `table:Staggered
${'\t'}1${'\t'}2${'\t'}3${'\t'}4
${'\t'}1${'\t'}2${'\t'}3
${'\t'}1
${'\t'}1${'\t'}2
${'\t'}`
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
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
    const input = `table:hello
${'\t'}1${'\t'}2${'\t'}3
${'\t'}1 ${'\t'}2 ${'\t'}3
${'\t'}------${'\t'}------${'\t'}------
${'\t'}a${'\t'}b${'\t'}c
table:hello
${'\t'}1${'\t'}2${'\t'}3
${'\t'}1 ${'\t'}2 ${'\t'}3
${'\t'}------${'\t'}------${'\t'}------
${'\t'}a${'\t'}b${'\t'}c`
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
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
    const input = `table:table with link
${'\t'}[Link]${'\t'}This is [Link]`
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
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
                href: 'Link'
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
                href: 'Link'
              }
            ]
          ]
        ]
      }
    ])
  })
})
