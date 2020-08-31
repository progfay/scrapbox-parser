import { createNodeParser } from './creator'

import type { NodeCreator } from './creator'

const placeFirstGoogleMapRegExp = /^(.*?)(\[(?:[^\]]*[^\s]\s+)?[NS]\d+(?:\.\d+)?,[EW]\d+(?:\.\d+)?(?:,Z\d+)?\])(.*)$/
const coordFirstGoogleMapRegExp = /^(.*?)(\[[NS]\d+(?:\.\d+)?,[EW]\d+(?:\.\d+)?(?:,Z\d+)?(?:\s+[^\]]*[^\s])?\])(.*)$/

export interface GoogleMapNode {
  type: 'googleMap'
  latitude: number
  longitude: number
  zoom: number
  place: string
  url: string
}

const createGoogleMapNode: NodeCreator<GoogleMapNode> = target => {
  const isCoordFirst = target.startsWith('[N') || target.startsWith('[S')
  const separatorIndex = isCoordFirst ? target.indexOf(' ') : target.lastIndexOf(' ')
  const place =
    separatorIndex === -1
      ? ''
      : isCoordFirst
      ? target.substring(separatorIndex + 1, target.length - 1)
      : target.substring(1, separatorIndex)
  const coord =
    separatorIndex === -1
      ? target.substring(1, target.length - 1)
      : isCoordFirst
      ? target.substring(1, separatorIndex)
      : target.substring(separatorIndex + 1, target.length - 1)
  const [lat, lng, _zoom] = coord.split(',')

  const latitude = parseFloat(lat.replace(/^N/, '').replace(/^S/, '-'))
  const longitude = parseFloat(lng.replace(/^E/, '').replace(/^W/, '-'))
  const zoom = /^Z\d+$/.test(_zoom) ? parseInt(_zoom.replace(/^Z/, ''), 10) : 14
  const url =
    place !== ''
      ? `https://www.google.com/maps/place/${encodeURIComponent(
          place
        )}/@${latitude},${longitude},${zoom}z`
      : `https://www.google.com/maps/@${latitude},${longitude},${zoom}z`

  return {
    type: 'googleMap',
    latitude,
    longitude,
    zoom,
    place,
    url
  }
}

export const GoogleMapNodeParser = createNodeParser(createGoogleMapNode, {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [placeFirstGoogleMapRegExp, coordFirstGoogleMapRegExp]
})
