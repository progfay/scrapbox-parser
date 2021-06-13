import { parse, ParserOption } from "../src";
import { toMatchSnapshot } from "jest-snapshot";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    export interface Expect {
      toMatchSnapshotWhenParsing: (
        received: string,
        opts?: ParserOption
      ) => CustomMatcherResult;
    }

    export interface Matchers<R> {
      toMatchSnapshotWhenParsing: (opts?: ParserOption) => R;
    }
  }
}

expect.extend({
  toMatchSnapshotWhenParsing(
    this: unknown,
    received: string,
    opts?: ParserOption
  ) {
    const blocks = parse(received, opts);
    return toMatchSnapshot.call(this, blocks, "toMatchSnapshotWhenParsing");
  },
});
