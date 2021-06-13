export interface Row {
  indent: number;
  text: string;
}

export const parseToRows = (input: string): Row[] =>
  input.split("\n").map((text) => ({
    indent: /^\s+/.exec(text)?.[0]?.length ?? 0,
    text,
  }));
