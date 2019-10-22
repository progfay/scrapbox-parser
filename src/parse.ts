import { BlockType, convertToBlock } from './block'
import { BlockComponentType, convertToBlockComponents } from './block/BlockComponent'
import { PackedBlockComponentType, packBlockComponents } from './block/PackedBlockComponent'

export type PageType = {
  title: string
  blocks: BlockType[]
}

export const convertToBlocks = (blockComponents: BlockComponentType[]): BlockType[] => {
  const packedBlockComponents: PackedBlockComponentType[] = packBlockComponents(blockComponents)
  return packedBlockComponents.map(convertToBlock)
}

export const parse = (input: string): PageType => {
  const blockComponents: BlockComponentType[] = convertToBlockComponents(input.trim())

  const [firstBlock, ...body] = blockComponents
  const title = firstBlock && firstBlock.text ? firstBlock.text : 'Untitled'
  const blocks = convertToBlocks(body)

  return { title, blocks }
}
