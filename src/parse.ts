import { BlockType, BlockComponentType, convertToBlockComponents } from './block'
import parseToBlocks from './block/parseToBlocks'

type PageType = {
  title: string
  blocks: Array<BlockType>
}

const parse = (input: string): PageType => {
  const blockComponents: Array<BlockComponentType> = convertToBlockComponents(input.trim())

  const firstBlock: BlockComponentType = blockComponents.shift() || { indent: 0, text: '' }
  const title: string = firstBlock.text || 'Untitled'
  const blocks: Array<BlockType> = parseToBlocks(blockComponents)

  return { title, blocks }
}

export default parse
