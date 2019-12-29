import { parse, LineType, DecorationType, DecorationNodeType } from '../../src'

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
[~ deco]`).toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('All decoration', () => {
    const input = '[**********!"#%&\'()*+,-./{|}<>_~ decos]'
    const blocks = parse(input, { hasTitle: false })
    const received = ((blocks[0] as LineType).nodes[0] as DecorationNodeType).decos
    const decos: DecorationType[] = ['*-10', '!', '"', '#', '%', '&', '\'', '(', ')', '+', ',', '-', '.', '/', '{', '|', '}', '<', '>', '_', '~']
    expect(new Set<DecorationType>(received)).toEqual(new Set<DecorationType>(decos))
  })

  it('Decoration * overflow', () => {
    expect('[*********** 11*]').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Decoration similar with externalLink', () => {
    expect('[* hoge https://example.com]').toMatchSnapshotWhenParsing({ hasTitle: false })
  })
})
