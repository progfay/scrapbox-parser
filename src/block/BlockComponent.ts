export interface BlockComponent {
  indent: number
  text: string
}

export const convertToBlockComponents = (input: string): BlockComponent[] =>
  input.split('\n').map(text => ({
    indent: /^\s+/.exec(text)?.[0].length ?? 0,
    text
  }))
