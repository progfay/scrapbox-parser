import { BlockComponent } from './BlockComponent'

export interface TitlePack {
  type: 'title'
  components: [BlockComponent]
}

export interface Title {
  type: 'title'
  text: string
}

export const convertToTitle = (pack: TitlePack): Title => {
  return {
    type: 'title',
    text: pack.components[0].text
  }
}
