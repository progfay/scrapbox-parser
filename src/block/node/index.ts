import { QuoteNodeType, createQuoteNode, quoteRegExp } from './QuoteNode'
import { StrongNodeType, createStrongNode, strongRegExp } from './StrongNode'
import { DecorationNodeType, createDecorationNode, decorationRegExp } from './DecorationNode'
import { CodeNodeType, createCodeNode, codeRegExp, codeCommandRegExp } from './CodeNode'
import { UrlNodeType, createUrlNode, httpRegExp, urlRegExp, leftUrlRegExp, rightUrlRegExp, isUrlMatch } from './UrlNode'
import { InternalLinkNodeType, createInternalLinkNode, internalLinkRegExp } from './InternalLinkNode'
import { IconNodeType, createIconNode, iconRegExp } from './IconNode'
import { HashTagNodeType, hashTagRegExp, createHashTagNode } from './HashTagNode'
import { PlainNodeType, createPlainNode } from './PlainNode'

export type LineNodeType = QuoteNodeType
                         | StrongNodeType
                         | DecorationNodeType
                         | CodeNodeType
                         | UrlNodeType
                         | InternalLinkNodeType
                         | IconNodeType
                         | HashTagNodeType
                         | PlainNodeType

export const convertToLineNodes = (text: string, { nested, quoted } = { nested: false, quoted: false }): Array<LineNodeType> => {
  if (!text) return []

  if (!nested && !quoted) {
    const quoteMatch = text.match(quoteRegExp)
    if (quoteMatch) {
      const [, target] = quoteMatch
      const nodes = convertToLineNodes(target, { nested, quoted: true })
      return [ createQuoteNode(nodes) ]
    }
  }

  if (!nested) {
    const codeCommandMatch = text.match(codeCommandRegExp)
    if (codeCommandMatch) {
      const [, target] = codeCommandMatch
      return [ createCodeNode(target) ]
    }

    const codeMatch = text.match(codeRegExp)
    if (codeMatch) {
      const [, left, target, right] = codeMatch
      return [
        ...convertToLineNodes(left, { nested, quoted }),
        createCodeNode(target),
        ...convertToLineNodes(right, { nested, quoted })
      ]
    }

    const strongMatch = text.match(strongRegExp)
    if (strongMatch) {
      const [, left, target, right] = strongMatch
      return [
        ...convertToLineNodes(left, { nested, quoted }),
        createStrongNode(convertToLineNodes(target, { nested: true, quoted })),
        ...convertToLineNodes(right, { nested, quoted })
      ]
    }

    const decorationMatch = text.match(decorationRegExp)
    if (decorationMatch) {
      const [, left, decoChars, target, right] = decorationMatch
      return [
        ...convertToLineNodes(left, { nested, quoted }),
        createDecorationNode(decoChars, convertToLineNodes(target, { nested: true, quoted })),
        ...convertToLineNodes(right, { nested, quoted })
      ]
    }
  }

  const UrlMatch = text.match(urlRegExp) ||
                   text.match(leftUrlRegExp) ||
                   text.match(rightUrlRegExp) ||
                   text.match(httpRegExp)
  if (isUrlMatch(UrlMatch)) {
    const [, left, , , right] = UrlMatch
    const { href, content } = UrlMatch.groups
    return [
      ...convertToLineNodes(left, { nested, quoted }),
      createUrlNode(href, content),
      ...convertToLineNodes(right, { nested, quoted })
    ]
  }

  const iconMatch = text.match(iconRegExp)
  if (iconMatch) {
    const [, left, path, , num = '1', right] = iconMatch
    const iconNode = createIconNode(path)
    return [
      ...convertToLineNodes(left, { nested, quoted }),
      ...new Array(parseInt(num)).fill(iconNode),
      ...convertToLineNodes(right, { nested, quoted })
    ]
  }

  const internalLinkMatch = text.match(internalLinkRegExp)
  if (internalLinkMatch) {
    const [, left, target, right] = internalLinkMatch
    return [
      ...convertToLineNodes(left, { nested, quoted }),
      createInternalLinkNode(target),
      ...convertToLineNodes(right, { nested, quoted })
    ]
  }

  const hashTagMatch = text.match(hashTagRegExp)
  if (hashTagMatch) {
    const [, left, target, right] = hashTagMatch
    return [
      ...convertToLineNodes(left, { nested, quoted }),
      createHashTagNode(target),
      ...convertToLineNodes(right, { nested, quoted })
    ]
  }

  return [ createPlainNode(text) ]
}
