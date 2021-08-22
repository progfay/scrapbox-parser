import {createNodeParser} from "./creator";
import {parseParams} from "../../utils/parseParams";

import type {YoutubeNode} from "./type";
import type {NodeCreator} from "./creator";

const youtubeUrlRegExp =
  /\[(https?:\/\/(?:www\.|)youtube\.com\/watch\?((?:[^\s]+&|)v=([a-zA-Z\d_-]+)(?:&[^\s]+|)))\]/;
const youtubeShortUrlRegExp =
  /\[(https?:\/\/youtu\.be\/([a-zA-Z\d_-]+)(?:\?([^\s]{0,100})|))\]/;
const youtubeListUrlRegExp =
  /\[(https?:\/\/(?:www\.|)youtube\.com\/playlist\?((?:[^\s]+&|)list=([a-zA-Z\d_-]+)(?:&[^\s]+|)))\]/;

const createYoutubeNode: NodeCreator<YoutubeNode> = (raw) => {
  let src = "", params = "", videoId: string | undefined = undefined, listId: string | undefined = undefined;
  let match = raw.match(youtubeUrlRegExp);
  if (match !== null) {
    [, src = "", params = "", videoId] = match;
  } else {

    match = raw.match(youtubeShortUrlRegExp);
    if (match !== null) {
      [, src = "", videoId, params = ""] = match;
    } else {

      match = raw.match(youtubeListUrlRegExp) as RegExpMatchArray;
      [, src = "", params = "", listId] = match;
    }
  }

  return {
    type: "youtube",
    raw,
    src,
    videoId,
    listId,
    params: parseParams(params ?? ""),
  };
}

export const YoutubeNodeNodeParser = createNodeParser(createYoutubeNode, {
  parseOnNested: true,
  parseOnQuoted: true,
  patterns: [youtubeUrlRegExp, youtubeShortUrlRegExp, youtubeListUrlRegExp],
});
