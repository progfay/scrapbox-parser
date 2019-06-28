export type BlockComponentType = {
  indent: number
  text: string
}

export const convertToBlockComponents = (blocks: string): Array<BlockComponentType> => (
  blocks.split('\n')
    .map((block: string): BlockComponentType => {
      const blockMatcher = block.match(/^\s*/)
      const indent = blockMatcher![0].length
      return { indent, text: block }
    })
)
