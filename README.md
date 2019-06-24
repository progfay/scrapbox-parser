# Scrapbox Parser

[![Build Status](https://travis-ci.org/progfay/scrapbox-parser.svg?branch=master)](https://travis-ci.org/progfay/scrapbox-parser)

parse Scrapbox notation to JavaScript Object

```js
import parse from 'scrapbox-parser'

const PROJECT_NAME = 'help'
const PAGE_NAME = 'syntax'

fetch(`https://scrapbox.io/api/pages/${PROJECT_NAME}/${PAGE_NAME}/text`)
	.then(response => response.text())
	.then(text => parse(text))
```

