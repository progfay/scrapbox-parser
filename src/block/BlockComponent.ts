export interface BlockComponent {
  indent: number
  text: string
}

export const convertToBlockComponent = (block: string): BlockComponent => ({
  indent: /^\s+/.exec(block)?.[0].length ?? 0,
  text: block
})

export const convertToBlockComponents = (blocks: string): BlockComponent[] =>
  blocks.split('\n').map(convertToBlockComponent)
