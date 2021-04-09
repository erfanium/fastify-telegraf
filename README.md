# fastify-telegraf

[![NPM version](https://img.shields.io/npm/v/fastify-telegraf.svg?style=flat)](https://www.npmjs.com/package/fastify-telegraf)
[![NPM downloads](https://img.shields.io/npm/dm/fastify-telegraf.svg?style=flat)](https://www.npmjs.com/package/fastify-telegraf)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Known Vulnerabilities](https://snyk.io/test/github/erfanium/fastify-telegraf/badge.svg)](https://snyk.io/test/github/erfanium/fastify-telegraf)

[Fastify](https://github.com/fastify/fastify) plugin to handle [Telegraf's](https://github.com/telegraf/telegraf) webhook with Typescript support, supports fastify 4.x.x

## Install

```sh
npm i fastify-telegraf

// or

yarn add fastify-telegraf
```

## Example

Given the following code:

```js
const fastify = require('fastify')()
const { Telegraf } = require('telegraf')
const telegrafPlugin = require('fastify-telegraf')

const bot = new Telegraf(BOT_TOKEN)

fastify.register(telegrafPlugin, { bot, path: '/my-secret-path' })

fastify.listen(8000, (err) => {
  if (err) throw err
})
```

### Note
Use fastify-telegraf@1.0.1 for telegraf v3

## License

Licensed under [MIT](./LICENSE)
