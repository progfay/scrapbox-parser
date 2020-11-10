import { convertToBlock } from './block'
import { parseToBlockComponents } from './block/BlockComponent'
import { packBlockComponents } from './block/Pack'

import type { Block } from './block'

export interface ParserOption {
  hasTitle?: boolean
}

export type Page = Block[]

export const parse = (input: string, opts?: ParserOption): Page => {
  const blockComponents = parseToBlockComponents(input)
  const packedBlockComponents = packBlockComponents(blockComponents, {
    hasTitle: opts?.hasTitle ?? true
  })
  return packedBlockComponents.map(convertToBlock)
}

export const getTitle = (input: string): string => {
  const match = /^\s*\S.*\s*$/m.exec(input)
  return match !== null ? match[0].trim() : 'Untitled'
}
