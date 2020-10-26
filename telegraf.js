'use strict'

const fp = require('fastify-plugin')

function telegrafPlugin (fastify, options, next) {
  const bot = options.bot
  fastify.post(options.path, async (req, rep) => {
    await bot.handleUpdate(req.body)
    rep.send()
  })
  next()
}

module.exports = fp(telegrafPlugin, {
  fastify: '3.x',
  name: 'fastify-telegraf'
})
