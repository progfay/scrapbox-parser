import { convertToNodes } from "./node";

import type { Row } from "./Row";
import type { Node } from "./node/type";

export interface TablePack {
  type: "table";
  rows: Row[];
}

export interface Table {
  indent: number;
  type: "table";
  fileName: string;
  cells: Node[][][];
}

export const convertToTable = (pack: TablePack): Table => {
  const {
    rows: [head, ...body],
  } = pack;
  const { indent = 0, text = "" } = head ?? {};
  const fileName = text.replace(/^\s*table:/, "");

  return {
    indent,
    type: "table",
    fileName,
    cells: body
      .map((row: Row): string => row.text.substring(indent + 1))
      .map((text: string): Node[][] =>
        text.split("\t").map((block: string): Node[] =>
          convertToNodes(block, {
            nested: false,
            quoted: false,
            context: "table",
          })
        )
      ),
  };
};
