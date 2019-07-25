/* global describe it expect */

import { BlockComponentType, convertToBlockComponents } from '../../src/block/BlockComponent'
import { BlockType } from '../../src/block'
import { convertToBlocks } from '../../src/parse'

describe('googleMap', () => {
  it('Simple google map with NE', () => {
    const input = '[N35.6812362,E139.7649361]'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'googleMap',
            latitude: 35.6812362,
            longitude: 139.7649361,
            zoom: 14,
            place: '',
            url: 'https://www.google.com/maps/@35.6812362,139.7649361,14z'
          }
        ]
      }
    ])
  })

  it('Simple google map with SW', () => {
    const input = '[S13.70533,W69.6533372]'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'googleMap',
            latitude: -13.70533,
            longitude: -69.6533372,
            zoom: 14,
            place: '',
            url: 'https://www.google.com/maps/@-13.70533,-69.6533372,14z'
          }
        ]
      }
    ])
  })

  it('Simple google map with zoom', () => {
    const input = '[N35.6812362,E139.7649361,Z14]'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'googleMap',
            latitude: 35.6812362,
            longitude: 139.7649361,
            zoom: 14,
            place: '',
            url: 'https://www.google.com/maps/@35.6812362,139.7649361,14z'
          }
        ]
      }
    ])
  })

  it('Simple google map with place on left', () => {
    const input = '[東京駅 N35.6812362,E139.7649361,Z14]'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'googleMap',
            latitude: 35.6812362,
            longitude: 139.7649361,
            zoom: 14,
            place: '東京駅',
            url: 'https://www.google.com/maps/place/%E6%9D%B1%E4%BA%AC%E9%A7%85/@35.6812362,139.7649361,14z'
          }
        ]
      }
    ])
  })

  it('Simple google map with place on right', () => {
    const input = '[N35.6812362,E139.7649361,Z14 東京駅]'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'googleMap',
            latitude: 35.6812362,
            longitude: 139.7649361,
            zoom: 14,
            place: '東京駅',
            url: 'https://www.google.com/maps/place/%E6%9D%B1%E4%BA%AC%E9%A7%85/@35.6812362,139.7649361,14z'
          }
        ]
      }
    ])
  })
})
