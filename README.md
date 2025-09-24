# Scrapbox Parser

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&color=AC1500&labelColor=222222)](LICENSE)
[![npm version](https://img.shields.io/npm/v/@progfay/scrapbox-parser?style=for-the-badge&message=NPM&color=CB3837&logo=NPM&labelColor=222222&label=npm)](https://www.npmjs.com/package/@progfay/scrapbox-parser)
[![JSR version](https://img.shields.io/jsr/v/@progfay/scrapbox-parser?style=for-the-badge&message=JSR&color=F7DF1E&logo=JSR&labelColor=222222&label=JSR)](https://jsr.io/@progfay/scrapbox-parser)

parse Scrapbox notation to JavaScript Object

## Installation

```sh
$ npm i @progfay/scrapbox-parser
```

Also, you can install `@progfay/scrapbox-parser` via [JSR](https://jsr.io/@progfay/scrapbox-parser).

## Usage

```js
import { parse } from "@progfay/scrapbox-parser";

const PROJECT_NAME = "help";
const PAGE_NAME = "syntax";

fetch(`https://scrapbox.io/api/pages/${PROJECT_NAME}/${PAGE_NAME}/text`)
  .then((response) => response.text())
  .then((text) => parse(text));
```
