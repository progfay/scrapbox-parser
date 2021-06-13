import { convertToBlock } from "./block";
import { parseToRows } from "./block/Row";
import { packRows } from "./block/Pack";

import type { Block } from "./block";

export interface ParserOption {
  hasTitle?: boolean;
}

export type Page = Block[];

export const parse = (input: string, opts?: ParserOption): Page => {
  const rows = parseToRows(input);
  const packs = packRows(rows, { hasTitle: opts?.hasTitle ?? true });
  return packs.map(convertToBlock);
};

export const getTitle = (input: string): string => {
  const match = /^\s*\S.*$/m.exec(input);
  return match?.[0]?.trim() ?? "Untitled";
};
