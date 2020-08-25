import { parse } from '../../src'

describe('strongIcon', () => {
  it('Simple root strong icon', () => {
    expect('[[/icons/+1.icon]]').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Simple relative strong icon', () => {
    expect('[[me.icon]]').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Multiple icons', () => {
    expect('[[me.icon*3]]').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Strong icon and internal link on same line', () => {
    expect('[Internal link][[me.icon]]').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Each multiple strong icon must be different Object', () => {
    const [block] = parse('[[me.icon*2]]', { hasTitle: false })
    if (block.type !== 'line') {
      throw new Error('fail')
    }

    const [strongIcon1, strongIcon2] = block.nodes
    expect(strongIcon1 === strongIcon2).toBe(false)
  })
})
