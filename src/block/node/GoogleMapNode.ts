import { convertToLineNodes } from '.'

import type { NodeParserType } from '.'

const googleMapRegExp = /^(?<left>.*?)\[(?<latitude>([NS]\d+(\.\d+)?),(?<longitude>[EW]\d+(\.\d+)?)(?<zoom>(,Z\d+)?))(?<place>)\](?<right>.*)$/
const leftGoogleMapRegExp = /^(?<left>.*?)\[(?<place>[^\]]*[^\s])\s+(?<latitude>([NS]\d+(\.\d+)?),(?<longitude>[EW]\d+(\.\d+)?)(?<zoom>(,Z\d+)?))\](?<right>.*)$/
const rightGoogleMapRegExp = /^(?<left>.*?)\[(?<latitude>([NS]\d+(\.\d+)?),(?<longitude>[EW]\d+(\.\d+)?)(?<zoom>(,Z\d+)?))\s+(?<place>[^\]]*[^\s])\](?<right>.*)$/

type googleMapMatchType = {
  groups: {
    left: string
    right: string
    latitude: string
    longitude: string
    zoom: string
    place: string
  }
}

const isGoogleMapMatch = (obj: any): obj is googleMapMatchType => (
  obj && obj.groups && obj.groups.latitude
)

export type GoogleMapNodeType = {
  type: 'googleMap'
  latitude: number
  longitude: number
  zoom: number
  place: string
  url: string
}

const createGoogleMapNode = (_latitude: string, _longitude: string, _zoom: string, place: string): GoogleMapNodeType => {
  const latitude = parseFloat(_latitude.replace(/^N/, '').replace(/^S/, '-'))
  const longitude = parseFloat(_longitude.replace(/^E/, '').replace(/^W/, '-'))
  const zoom = parseInt(_zoom.replace(/^,Z/, '') || '14', 10)
  const url = place
    ? `https://www.google.com/maps/place/${encodeURIComponent(place)}/@${latitude},${longitude},${zoom}z`
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

export const GoogleMapNodeParser: NodeParserType = (text, { nested, quoted }, next) => {
  if (nested) return next()

  const googleMapMatch = text.match(googleMapRegExp) ||
                   text.match(leftGoogleMapRegExp) ||
                   text.match(rightGoogleMapRegExp)
  if (!isGoogleMapMatch(googleMapMatch)) return next()

  const { left, latitude, longitude, zoom, place, right } = googleMapMatch.groups
  return [
    ...convertToLineNodes(left, { nested, quoted }),
    createGoogleMapNode(latitude, longitude, zoom, place),
    ...convertToLineNodes(right, { nested, quoted })
  ]
}
