export const codeRegExp = /^(.*?)`(.*?)`(.*)$/
export const codeCommandRegExp = /^(\$ .+)$/

export type CodeNodeType = {
  type: 'code'
  text: string
}

export const createCodeNode = (text: string): CodeNodeType => ({
  type: 'code',
  text
})
