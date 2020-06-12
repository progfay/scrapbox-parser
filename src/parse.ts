import { convertToBlock } from './block'
import { convertToBlockComponents } from './block/BlockComponent'
import { packBlockComponents } from './block/PackedBlockComponent'

import type { Block } from './block'
import type { PackedBlockComponent } from './block/PackedBlockComponent'

export interface ParserOption {
  hasTitle: boolean
}

export type Page = Block[]

export const parse = (input: string, { hasTitle = true }: Partial<ParserOption> = {}): Page => {
  const blockComponents = convertToBlockComponents(input)
  const packedBlockComponents: PackedBlockComponent[] = packBlockComponents(blockComponents, { hasTitle })
  return packedBlockComponents.map(convertToBlock)
}

export const getTitle = (input: string): string => {
  const match = input.match(/^\s*(\S.*)\s*$/m)
  return match !== null ? match[1].trim() : 'Untitled'
}
