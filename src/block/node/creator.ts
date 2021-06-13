import { convertToNodes } from ".";

import type { NodeParser, NodeParserOption } from ".";
import type { Node } from "./type";

export type NodeCreator<T extends Node> = (
  target: string,
  opts: NodeParserOption
) => T | T[];

type NodeParserCreator<T extends Node> = (
  nodeCreator: NodeCreator<T>,
  opts: { parseOnNested: boolean; parseOnQuoted: boolean; patterns: RegExp[] }
) => NodeParser;

export const createNodeParser: NodeParserCreator<Node> = (
  nodeCreator,
  { parseOnNested, parseOnQuoted, patterns }
) => {
  return (text, opts, next) => {
    if (!parseOnNested && opts.nested) return next?.() ?? [];
    if (!parseOnQuoted && opts.quoted) return next?.() ?? [];

    for (const pattern of patterns) {
      const match = pattern.exec(text);
      if (match === null) continue;

      const left = text.substring(0, match.index);
      const right = text.substring(match.index + (match[0]?.length ?? 0));

      const node = nodeCreator(match[0] ?? "", opts);
      return [
        ...convertToNodes(left, opts),
        ...(Array.isArray(node) ? node : [node]),
        ...convertToNodes(right, opts),
      ];
    }

    return next?.() ?? [];
  };
};
