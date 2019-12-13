import CombinedStream from './CombinedStream'
import ConvertToBlockStream from './ConvertToBlockStream'
import PackingBlockStream from './PackingBlockStream'
import ParsingStream from './ParsingStream'

export class ScrapboxParserStream extends CombinedStream {
  constructor () {
    super(
      new ConvertToBlockStream(),
      new PackingBlockStream(),
      new ParsingStream()
    )
  }
}
