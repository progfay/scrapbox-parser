# Scrapbox Parser

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&color=AC1500&labelColor=222222)](LICENSE)
[![npm version](https://img.shields.io/npm/v/@progfay/scrapbox-parser?style=for-the-badge&message=NPM&color=CB3837&logo=NPM&labelColor=222222&label=npm)](https://www.npmjs.com/package/@progfay/scrapbox-parser)
[![Build Status](https://img.shields.io/travis/progfay/scrapbox-parser?style=for-the-badge&message=Travis+CI&color=3EAAAF&logo=Travis+CI&labelColor=222222&logoColor=FFFFFF)](https://travis-ci.org/progfay/scrapbox-parser)
[![Maintainability](https://img.shields.io/codeclimate/maintainability/progfay/scrapbox-parser?style=for-the-badge&message=Code+Climate&labelColor=222222&logo=Code+Climate&logoColor=FFFFFF)](https://codeclimate.com/github/progfay/scrapbox-parser/maintainability)
[![Test Coverage](https://img.shields.io/codeclimate/coverage/progfay/scrapbox-parser?style=for-the-badge&message=Code+Climate&labelColor=222222&logo=Code+Climate&logoColor=FFFFFF)](https://codeclimate.com/github/progfay/scrapbox-parser/coverage)

parse Scrapbox notation to JavaScript Object

## Installation

```sh
$ npm i @progfay/scrapbox-parser
```

## Usage

```js
import { parse } from "@progfay/scrapbox-parser";
import fetch from "node-fetch";

const PROJECT_NAME = "help";
const PAGE_NAME = "syntax";

fetch(`https://scrapbox.io/api/pages/${PROJECT_NAME}/${PAGE_NAME}/text`)
  .then((response) => response.text())
  .then((text) => parse(text));
```
