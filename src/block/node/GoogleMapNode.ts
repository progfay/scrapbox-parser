import { createNodeParser } from './creator'

import type { NodeCreator } from './creator'

const placeFirstGoogleMapRegExp = /\[([^\]]*[^\s])\s+([NS]\d+(?:\.\d+)?,[EW]\d+(?:\.\d+)?(?:,Z\d+)?)\]/
const coordFirstGoogleMapRegExp = /\[([NS]\d+(?:\.\d+)?,[EW]\d+(?:\.\d+)?(?:,Z\d+)?)(?:\s+([^\]]*[^\s]))?\]/

interface Coordinate {
  latitude: number
  longitude: number
  zoom: number
}

const parseCoordinate: (format: string) => Coordinate = format => {
  const [lat, lng, z] = format.split(',')
  const latitude = parseFloat(lat.replace(/^N/, '').replace(/^S/, '-'))
  const longitude = parseFloat(lng.replace(/^E/, '').replace(/^W/, '-'))
  const zoom = /^Z\d+$/.test(z) ? parseInt(z.replace(/^Z/, ''), 10) : 14
  return { latitude, longitude, zoom }
}

export interface GoogleMapNode {
  type: 'googleMap'
  latitude: number
  longitude: number
  zoom: number
  place: string
  url: string
}

const createGoogleMapNode: NodeCreator<GoogleMapNode> = target => {
  const match = target.match(placeFirstGoogleMapRegExp) ?? target.match(coordFirstGoogleMapRegExp)
  if (match === null) return []

  const isCoordFirst = target.startsWith('[N') || target.startsWith('[S')
  const [, coord, place = ''] = isCoordFirst ? match : [match[0], match[2], match[1]]
  const { latitude, longitude, zoom } = parseCoordinate(coord)

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
