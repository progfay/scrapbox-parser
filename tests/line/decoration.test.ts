/* global describe it expect */

import { BlockComponentType, convertToBlockComponents } from '../../src/block/BlockComponent'
import { BlockType } from '../../src/block'
import { LineType } from '../../src/block/Line'
import { DecorationType, DecorationNodeType } from '../../src/block/node/DecorationNode'
import { convertToBlocks } from '../../src/parse'

describe('decoration', () => {
  it('Simple decoration', () => {
    expect(`[* deco]
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
[~ deco]`).toMatchSnapshotWhenParsing()
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
    expect('[*********** 11*]').toMatchSnapshotWhenParsing()
  })

  it('Decoration similar with externalLink', () => {
    expect('[* hoge https://example.com]').toMatchSnapshotWhenParsing()
  })
})
