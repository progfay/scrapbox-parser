export type LineComponentType = {
  indent: number
  text: string
}

export const convertToLineComponents = (lines: string): Array<LineComponentType> => (
  lines.split('\n')
    .map((line: string): LineComponentType => {
      const lineMatcher = line.match(/^\s*/)
      const indent: number = lineMatcher ? lineMatcher[0].length : 0
      return { indent, text: line }
    })
)
