import { describe, it } from "node:test";
import { parse } from "../../src/index.ts";

describe("numberList", () => {
  it("Minimum numberList", ({ assert }) => {
    assert.snapshot(
      parse("1. ", {
        hasTitle: false,
      })
    );
  });

  it("Simple numberList", ({ assert }) => {
    assert.snapshot(
      parse("1. Simple numberList", {
        hasTitle: false,
      })
    );
  });

  it("1. with decoration", ({ assert }) => {
    assert.snapshot(
      parse("1. [* deco]", {
        hasTitle: false,
      })
    );
  });

  it("1. with code", ({ assert }) => {
    assert.snapshot(
      parse("1. `code`", {
        hasTitle: false,
      })
    );
  });

  it("1. with no space is not numberList", ({ assert }) => {
    assert.snapshot(
      parse("1.not numberList", {
        hasTitle: false,
      })
    );
  });

  it("No head 1. is not numberList", ({ assert }) => {
    assert.snapshot(
      parse("a 1. not numberList", {
        hasTitle: false,
      })
    );
  });

  it("Quoted 1. is not numberList", ({ assert }) => {
    assert.snapshot(parse("> 1. Quoted", { hasTitle: false }));
  });
});
