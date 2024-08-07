import { describe, expect, it } from "vitest";
import { parse } from "../../src/index.ts";

describe("Code Block", () => {
	it("Simple code block", () => {
		expect(
			parse(
				`
code:hello.js
 function () {
   alert(document.location.href)
   console.log("hello")
   // You can also write comments!
 }
`.trim(),
				{ hasTitle: false },
			),
		).toMatchSnapshot();
	});

	it("Bulleted code block", () => {
		expect(
			parse(
				` code:hello.js
  function () {
    alert(document.location.href)
    console.log("hello")
    // You can also write comments!
  }`,
				{ hasTitle: false },
			),
		).toMatchSnapshot();
	});

	it("Code block with bullet", () => {
		expect(
			parse(
				` Bullet
 code:hello.js
  function () {
    alert(document.location.href)
    console.log("hello")
    // You can also write comments!
  }
 Bullet`,
				{ hasTitle: false },
			),
		).toMatchSnapshot();
	});

	it("Consecutive code blocks", () => {
		expect(
			parse(
				`
code:hello.js
 function () {
   alert(document.location.href)
   console.log("hello")
   // You can also write comments!
 }
code:hello.js
 function () {
   alert(document.location.href)
   console.log("hello")
   // You can also write comments!
 }
`.trim(),
				{ hasTitle: false },
			),
		).toMatchSnapshot();
	});
});
