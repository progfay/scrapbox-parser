/* global describe it expect */

import { BlockComponentType, convertToBlockComponents } from '../../src/block/BlockComponent'
import { BlockType } from '../../src/block'
import { LineType } from '../../src/block/Line'
import { DecorationType, DecorationNodeType } from '../../src/block/node/DecorationNode'
import { convertToBlocks } from '../../src/parse'

const createDecorartionNode = (decos: DecorationType[], text: string): LineType => ({
  indent: 0,
  type: 'line',
  nodes: [
    {
      type: 'decoration',
      decos,
      nodes: [
        {
          type: 'plain',
          text
        }
      ]
    }
  ]
})

describe('decoration', () => {
  it('Simple decoration', () => {
    const input = `[* deco]
[** deco]
[*** deco]
[**** deco]
[***** deco]
[****** deco]
[******* deco]
[******** deco]
[********* deco]
[********** deco]
[! deco]
[" deco]
[# deco]
[% deco]
[& deco]
[' deco]
[( deco]
[) deco]
[+ deco]
[, deco]
[- deco]
[. deco]
[/ deco]
[{ deco]
[| deco]
[} deco]
[< deco]
[> deco]
[_ deco]
[~ deco]`
    const decosArray: DecorationType[][] = [
      ['*-1'], ['*-2'], ['*-3'], ['*-4'], ['*-5'], ['*-6'], ['*-7'], ['*-8'], ['*-9'], ['*-10'],
      ['!'], ['"'], ['#'], ['%'], ['&'], ['\''], ['('], [')'], ['+'], [','], ['-'], ['.'], ['/'], ['{'], ['|'], ['}'], ['<'], ['>'], ['_'], ['~']
    ]
    const expected: BlockType[] = decosArray.map((decos: DecorationType[]): LineType => createDecorartionNode(decos, 'deco'))
    expect(input).toEqualWhenParsing(expected)
  })

  it('All decoration', () => {
    const input = '[**********!"#%&\'()*+,-./{|}<>_~ decos]'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    const received = ((blocks[0] as LineType).nodes[0] as DecorationNodeType).decos
    const decos: DecorationType[] = ['*-10', '!', '"', '#', '%', '&', '\'', '(', ')', '+', ',', '-', '.', '/', '{', '|', '}', '<', '>', '_', '~']
    expect(new Set<DecorationType>(received)).toEqual(new Set<DecorationType>(decos))
  })

  it('Decoration * overflow', () => {
    const decos: DecorationType[] = ['*-10']
    const expected: LineType[] = [createDecorartionNode(decos, '11*')]
    expect('[*********** 11*]').toEqualWhenParsing(expected)
  })

  it('Decoration similar with externalLink', () => {
    expect('[* hoge https://example.com]').toEqualWhenParsing([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'decoration',
            decos: ['*-1'],
            nodes: [
              {
                type: 'plain',
                text: 'hoge '
              },
              {
                type: 'link',
                pathType: 'absolute',
                href: 'https://example.com',
                content: ''
              }
            ]
          }
        ]
      }
    ])
  })
})
