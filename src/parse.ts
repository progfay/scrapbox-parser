import { BlockType, convertToBlock } from './block'
import { BlockComponentType, convertToBlockComponents } from './block/BlockComponent'
import { PackedBlockComponentType, packBlockComponents } from './block/PackedBlockComponent'

export type PageType = {
  title: string
  blocks: BlockType[]
}

export type ParserType = (input: string) => PageType

export const convertToBlocks = (blockComponents: BlockComponentType[]): BlockType[] => {
  const packedBlockComponents: PackedBlockComponentType[] = packBlockComponents(blockComponents)
  return packedBlockComponents.map(convertToBlock)
}

export const parse: ParserType = input => {
  const blockComponents: BlockComponentType[] = convertToBlockComponents(input.trim())

  const [firstBlock, ...body] = blockComponents
  const title = firstBlock && firstBlock.text ? firstBlock.text : 'Untitled'
  const blocks = convertToBlocks(body)

  return { title, blocks }
}

export const getTitle = (input: string): string => {
  const match = (`${input}\n`).match(/^\s*(\S[^\n]+)\n/)
  if (!match) return 'Untitled'
  return match[1].trim()
}
