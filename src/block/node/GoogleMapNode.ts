import { createPlainNode } from "./PlainNode.ts";
import { createNodeParser } from "./creator.ts";

import type { NodeCreator } from "./creator.ts";
import type { NodeParser } from "./index.ts";
import type { GoogleMapNode, PlainNode } from "./type.ts";

const placeFirstGoogleMapRegExp =
	/\[([^\]]*[^\s])\s+([NS]\d+(?:\.\d+)?,[EW]\d+(?:\.\d+)?(?:,Z\d+)?)\]/;
const coordFirstGoogleMapRegExp =
	/\[([NS]\d+(?:\.\d+)?,[EW]\d+(?:\.\d+)?(?:,Z\d+)?)(?:\s+([^\]]*[^\s]))?\]/;

interface Coordinate {
	latitude: number;
	longitude: number;
	zoom: number;
}

const parseCoordinate: (format: string) => Coordinate = (format) => {
	const [lat = "", lng = "", z = ""] = format.split(",");
	const latitude = Number.parseFloat(lat.replace(/^N/, "").replace(/^S/, "-"));
	const longitude = Number.parseFloat(lng.replace(/^E/, "").replace(/^W/, "-"));
	const zoom = /^Z\d+$/.test(z) ? Number.parseInt(z.replace(/^Z/, ""), 10) : 14;
	return { latitude, longitude, zoom };
};

const createGoogleMapNode: NodeCreator<GoogleMapNode | PlainNode> = (
	raw,
	opts,
) => {
	if (opts.context === "table") {
		return createPlainNode(raw, opts);
	}

	const match =
		raw.match(placeFirstGoogleMapRegExp) ??
		raw.match(coordFirstGoogleMapRegExp);
	if (match === null) return [];

	const isCoordFirst = raw.startsWith("[N") || raw.startsWith("[S");
	const [, coord = "", place = ""] = isCoordFirst
		? match
		: [match[0], match[2], match[1]];
	const { latitude, longitude, zoom } = parseCoordinate(coord);

	const url =
		place !== ""
			? `https://www.google.com/maps/place/${encodeURIComponent(
					place,
				)}/@${latitude},${longitude},${zoom}z`
			: `https://www.google.com/maps/@${latitude},${longitude},${zoom}z`;

	return [
		{
			type: "googleMap",
			raw,
			latitude,
			longitude,
			zoom,
			place,
			url,
		},
	];
};

export const GoogleMapNodeParser: NodeParser = createNodeParser(
	createGoogleMapNode,
	{
		parseOnNested: false,
		parseOnQuoted: true,
		patterns: [placeFirstGoogleMapRegExp, coordFirstGoogleMapRegExp],
	},
);
