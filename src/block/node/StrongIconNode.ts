import { createNodeParser } from "./creator";
import { generateIconNodeCreator } from "./IconNode";

const strongIconRegExp = /\[\[[^[\]]*\.icon(?:\*\d+)?\]\]/;

const createStrongIconNode = generateIconNodeCreator("strongIcon");

export const StrongIconNodeParser = createNodeParser(createStrongIconNode, {
  parseOnNested: false,
  parseOnQuoted: true,
  patterns: [strongIconRegExp],
});
