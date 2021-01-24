'use strict'

const fp = require('fastify-plugin')

function telegrafPlugin (fastify, options, next) {
  const bot = options.bot
  fastify.post(options.path, (req, rep) => {
    bot.handleUpdate(req.body, rep.raw)
  })

  next()
}

module.exports = fp(telegrafPlugin, {
  fastify: '3.x',
  name: 'fastify-telegraf'
})
