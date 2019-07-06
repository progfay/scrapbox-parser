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
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    const decosArray: DecorationType[][] = [
      ['*-1'], ['*-2'], ['*-3'], ['*-4'], ['*-5'], ['*-6'], ['*-7'], ['*-8'], ['*-9'], ['*-10'],
      ['!'], ['"'], ['#'], ['%'], ['&'], ['\''], ['('], [')'], ['+'], [','], ['-'], ['.'], ['/'], ['{'], ['|'], ['}'], ['<'], ['>'], ['_'], ['~']
    ]
    const answer: LineType[] = decosArray.map((decos: DecorationType[]): LineType => createDecorartionNode(decos, 'deco'))
    expect(blocks).toEqual(answer)
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
    const input = '[*********** 11*]'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    const decos: DecorationType[] = ['*-10']
    const answer: LineType[] = [createDecorartionNode(decos, '11*')]
    expect(blocks).toEqual(answer)
  })
})
