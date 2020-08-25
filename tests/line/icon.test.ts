import { parse } from '../../src'

describe('icon', () => {
  it('Simple root icon', () => {
    expect('[/icons/+1.icon]').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Simple relative icon', () => {
    expect('[me.icon]').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Multiple icons', () => {
    expect('[me.icon*3]').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Icon and internal link on same line', () => {
    expect('[Internal link][me.icon]').toMatchSnapshotWhenParsing({ hasTitle: false })
  })

  it('Each multiple icon must be different Object', () => {
    const [block] = parse('[me.icon*2]', { hasTitle: false })
    if (block.type !== 'line') {
      throw new Error('fail')
    }

    const [icon1, icon2] = block.nodes
    expect(icon1 === icon2).toBe(false)
  })
})
