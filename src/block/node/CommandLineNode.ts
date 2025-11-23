import type { NodeCreator } from "./creator.ts";
import { createNodeParser } from "./creator.ts";
import type { NodeParser } from "./index.ts";
import { createPlainNode } from "./PlainNode.ts";
import type { CommandLineNode, PlainNode } from "./type.ts";

const commandLineRegExp = /^[$%] .+$/;

const createCommandLineNode: NodeCreator<CommandLineNode | PlainNode> = (
	[raw],
	opts,
) => {
	if (opts.context === "table") {
		return createPlainNode(raw);
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

export const CommandLineNodeParser: NodeParser = createNodeParser(
	createCommandLineNode,
	{
		parseOnNested: false,
		parseOnQuoted: false,
		patterns: [commandLineRegExp],
	},
);
