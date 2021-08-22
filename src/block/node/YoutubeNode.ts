import { createNodeParser } from "./creator";
import { parseParams } from "../../utils/parseParams";

import type { YoutubeNode } from "./type";
import type { NodeCreator } from "./creator";

const youtubeUrlRegExp =
  /\[(https?:\/\/(?:www\.|)youtube\.com\/watch\?((?:[^\s]+&|)v=([a-zA-Z\d_-]+)(?:&[^\s]+|)))\]/;
const youtubeShortUrlRegExp =
  /\[(https?:\/\/youtu\.be\/([a-zA-Z\d_-]+)(?:\?([^\s]{0,100})|))\]/;
const youtubeListUrlRegExp =
  /\[(https?:\/\/(?:www\.|)youtube\.com\/playlist\?((?:[^\s]+&|)list=([a-zA-Z\d_-]+)(?:&[^\s]+|)))\]/;

const isShort = (raw: string) => raw.includes("youtu.be");
const isPlayList = (raw: string) => raw.includes("playlist");

const createYoutubeNode: NodeCreator<YoutubeNode> = (raw) => {
  const match =
    raw.match(youtubeUrlRegExp) ??
    raw.match(youtubeShortUrlRegExp) ??
    raw.match(youtubeListUrlRegExp);
  if (match === null) return [];
  const src = match[1] ?? "";
  const short = isShort(raw);
  const params = short ? match[3] : match[2];
  const id = short ? match[2] : match[3];

  return {
    type: "youtube",
    raw,
    src,
    ...(isPlayList(raw) ? { listId: id } : { videoId: id }),
    params: parseParams(params ?? ""),
  };
};

export const YoutubeNodeParser = createNodeParser(createYoutubeNode, {
  parseOnNested: true,
  parseOnQuoted: true,
  patterns: [youtubeUrlRegExp, youtubeShortUrlRegExp, youtubeListUrlRegExp],
});
