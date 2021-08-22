import { parseParams } from "../../src/utils/parseParams";

describe("parseParams", () => {
  it("parse a pair", () => {
    expect(parseParams("hoge=fuga")).toEqual({ hoge: "fuga" });
  });
  it("parse pairs", () => {
    expect(parseParams("hoge=fuga&hogehoge=fugafuga")).toEqual({
      hoge: "fuga",
      hogehoge: "fugafuga",
    });
  });
  it("parse pairs which have the same key", () => {
    expect(parseParams("hoge=fuga&hoge=fugafuga")).toEqual({
      hoge: "fugafuga",
    });
  });
  it("parse a pair which has no value", () => {
    expect(parseParams("hoge")).toEqual({ hoge: "" });
  });
  it("parse pairs which have no value", () => {
    expect(parseParams("hoge&fuga")).toEqual({ hoge: "", fuga: "" });
  });
  it("parse pairs which may have no value", () => {
    expect(parseParams("hoge&fuga=hogefuga")).toEqual({
      hoge: "",
      fuga: "hogefuga",
    });
  });
  it("ignore unnecessary &", () => {
    expect(parseParams("&hoge&&fuga&fugafuga=hoge&")).toEqual({
      hoge: "",
      fuga: "",
      fugafuga: "hoge",
    });
  });
});
