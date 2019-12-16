import { TransformOptions } from 'stream'
import { ParserOptionType } from '../parse'
import CombinedStream from './CombinedStream'
import ConvertToBlockStream from './ConvertToBlockStream'
import PackingBlockStream from './PackingBlockStream'
import ParsingStream from './ParsingStream'

export class ScrapboxParserStream extends CombinedStream {
  constructor ({ hasTitle = true, ...option }: Partial<ParserOptionType & TransformOptions>) {
    super(
      option,
      new ConvertToBlockStream(),
      new PackingBlockStream({ hasTitle }),
      new ParsingStream()
    )
  }
}
