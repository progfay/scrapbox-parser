import { describe, it } from "node:test";
import { parse } from "../../src/index.ts";

describe("Code Block", () => {
	it("Simple code block", ({ assert }) => {
		assert.snapshot(
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
		);
	});

	it("Bulleted code block", ({ assert }) => {
		assert.snapshot(
			parse(
				` code:hello.js
  function () {
    alert(document.location.href)
    console.log("hello")
    // You can also write comments!
  }`,
				{ hasTitle: false },
			),
		);
	});

	it("Code block with bullet", ({ assert }) => {
		assert.snapshot(
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
		);
	});

	it("Consecutive code blocks", ({ assert }) => {
		assert.snapshot(
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
		);
	});
});
