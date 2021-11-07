import { createNodeParser } from "./creator";
import { createPlainNode } from "./PlainNode";

import type { CommandLineNode, PlainNode } from "./type";
import type { NodeCreator } from "./creator";

const commandLineRegExp = /^[$%] .+$/;

const createCommandLineNode: NodeCreator<CommandLineNode | PlainNode> = (
  raw: string,
  opts
) => {
  if (opts.context === "table") {
    return createPlainNode(raw, opts);
  }

  const symbol = raw[0] ?? "";
  const text = raw.substring(2);

  return [
    {
      type: "commandLine",
      raw,
      symbol,
      text,
    },
  ];
};

export const CommandLineNodeParser = createNodeParser(createCommandLineNode, {
  parseOnNested: false,
  parseOnQuoted: false,
  patterns: [commandLineRegExp],
});
