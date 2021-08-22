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

const createYoutubeNode: NodeCreator<YoutubeNode> = (raw) => {
  let match = raw.match(youtubeUrlRegExp);
  if (match !== null) {
    const [, src, params, videoId] = match;

    return {
      type: "youtube",
      raw,
      src: src ?? "",
      videoId,
      params: parseParams(params ?? ""),
    };
  }
  match = raw.match(youtubeShortUrlRegExp);
  if (match !== null) {
    const [, src, videoId, params] = match;

    return {
      type: "youtube",
      raw,
      src: src ?? "",
      videoId,
      params: parseParams(params ?? ""),
    };
  }
  match = raw.match(youtubeListUrlRegExp) as RegExpMatchArray;
  const [, src, params, listId] = match;

  return {
    type: "youtube",
    raw,
    src: src ?? "",
    listId,
    params: parseParams(params ?? ""),
  };
};

export const YoutubeNodeParser = createNodeParser(createYoutubeNode, {
  parseOnNested: true,
  parseOnQuoted: true,
  patterns: [youtubeUrlRegExp, youtubeShortUrlRegExp, youtubeListUrlRegExp],
});
