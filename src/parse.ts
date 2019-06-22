import { BlockType, convertToBlock, isBlock } from './block'
import { BlockComponentType, convertToBlockComponents } from './block/BlockComponent'
import { PackedBlockComponentType, packBlockComponents } from './block/PackedBlockComponent'

type PageType = {
  title: string
  blocks: Array<BlockType>
}

const parse = (input: string): PageType => {
  const blockComponents: Array<BlockComponentType> = convertToBlockComponents(input.trim())

  const firstBlock: BlockComponentType = blockComponents.shift() || { indent: 0, text: '' }
  const title: string = firstBlock.text || 'Untitled'
  const packedBlockComponents: Array<PackedBlockComponentType> = packBlockComponents(blockComponents)
  const blocks: Array<BlockType> = packedBlockComponents
    .map(convertToBlock)
    .filter(isBlock)

  return { title, blocks }
}

export default parse
