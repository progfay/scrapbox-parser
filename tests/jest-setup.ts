import { toMatchSnapshot } from "jest-snapshot";
import { parse, ParserOption } from "../src";

// ref. https://jestjs.io/docs/expect#expectextendmatchers

interface CustomMatchers<R = unknown> {
  toMatchSnapshotWhenParsing(opts?: ParserOption): R;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    /* eslint-disable @typescript-eslint/no-empty-interface */
    interface Expect extends CustomMatchers {}
    interface Matchers<R> extends CustomMatchers<R> {}
    interface InverseAsymmetricMatchers extends CustomMatchers {}
    /* eslint-enable @typescript-eslint/no-empty-interface */
  }
}

expect.extend({
  toMatchSnapshotWhenParsing(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this: any,
    received: string,
    opts?: ParserOption
  ) {
    const blocks = parse(received, opts);
    return toMatchSnapshot.call(this, blocks);
  },
});
