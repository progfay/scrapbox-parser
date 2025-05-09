import { parse } from "https://unpkg.com/@progfay/scrapbox-parser";
import hljs from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/es/highlight.min.js";

document.getElementById("parse-button").addEventListener("click", () => {
  const parsedJson = JSON.stringify(
    parse(document.getElementById("plain-text").value),
    null,
    2
  ).trim();
  const a = hljs.highlight(parsedJson, { language: "json" }).value;
  console.log(a);
  document.querySelector("#parsed-json>.json").innerHTML = a;
});
