import { createNodeParser } from "./creator";

import type { HashTagNode, PlainNode } from "./type";
import type { NodeCreator } from "./creator";

const hashTagRegExp = /(?:^|\s)#\S+/;

const createHashTagNode: NodeCreator<HashTagNode | PlainNode> = (raw) => {
  if (raw.startsWith("#")) {
    return {
      type: "hashTag",
      raw,
      href: raw.substring(1),
    };
  }

  const space = raw.substring(0, 1);
  const tag = raw.substring(1);

  return [
    {
      type: "plain",
      raw: space,
      text: space,
    },
    {
      type: "hashTag",
      raw: tag,
      href: tag.substring(1),
    },
  ];
};

export const HashTagNodeParser = createNodeParser(createHashTagNode, {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [hashTagRegExp],
});
