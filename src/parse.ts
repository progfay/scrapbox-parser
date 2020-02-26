import { BlockType, convertToBlock } from './block'
import { convertToBlockComponents } from './block/BlockComponent'
import { PackedBlockComponentType, packBlockComponents } from './block/PackedBlockComponent'

export type ParserOptionType = {
  readonly hasTitle: boolean
}

export type PageType = BlockType[]

export const parse = (input: string, { hasTitle = true }: Partial<ParserOptionType> = {}): PageType => {
  const blockComponents = convertToBlockComponents(input)
  const packedBlockComponents: PackedBlockComponentType[] = packBlockComponents(blockComponents, { hasTitle })
  return packedBlockComponents.map(convertToBlock)
}

export const getTitle = (input: string): string => {
  const match = input.match(/^\s*(\S.*)\s*$/m)
  if (!match) return 'Untitled'
  return match[1].trim()
}
