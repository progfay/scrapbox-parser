import { PackedBlockComponentType } from './PackedBlockComponent'

export type TitleComponentType = {
  type: 'title'
  text: string
}

export type TitleType = {
  type: 'title'
  text: string
}

export const isTitleComponent = (component: PackedBlockComponentType): component is TitleComponentType => (
  component.type === 'title'
)

export const convertToTitle = (blockComponent: TitleComponentType): TitleType => {
  return {
    type: 'title',
    text: blockComponent.text
  }
}
