import { convertToNodes } from "./node";

import type { Row } from "./Row";
import type { Node } from "./node/type";

export interface LinePack {
  type: "line";
  rows: [Row];
}

export interface Line {
  indent: number;
  type: "line";
  nodes: Node[];
}

export const convertToLine = (pack: LinePack): Line => {
  const { indent, text } = pack.rows[0];
  return {
    indent,
    type: "line",
    nodes: convertToNodes(text.substring(indent), {
      nested: false,
      quoted: false,
      context: "line",
    }),
  };
};
