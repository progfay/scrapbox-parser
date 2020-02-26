export type BlockComponentType = {
  readonly indent: number
  readonly text: string
}

export const convertToBlockComponent = (block: string): BlockComponentType => ({
  indent: block.match(/^\s+/)?.[0].length ?? 0,
  text: block
})

export const convertToBlockComponents = (blocks: string): BlockComponentType[] => (
  blocks.split('\n').map(convertToBlockComponent)
)
