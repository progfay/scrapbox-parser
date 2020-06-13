import type { PackedBlockComponent } from './PackedBlockComponent'

export interface TitleComponent {
  type: 'title'
  text: string
}

export interface Title {
  type: 'title'
  text: string
}

export const isTitleComponent = (
  component: PackedBlockComponent
): component is TitleComponent => component.type === 'title'

export const convertToTitle = (blockComponent: TitleComponent): Title => {
  return {
    type: 'title',
    text: blockComponent.text
  }
}
