'use strict'

const tap = require('tap')
const Fastify = require('fastify')
const { Telegraf } = require('telegraf')
const plugin = require('../')

const test = tap.test

test('should call bot.handleUpdate method', (t) => {
  const fastify = Fastify()
  const bot = new Telegraf('T')

  bot.handleUpdate = (update, response) => {
    t.deepEqual(update, { foo: 'bar' })
    t.assert(response)
    t.done()
  }

  fastify.register(plugin, { bot, path: '/secret' })

  fastify.inject({
    method: 'POST',
    path: '/secret',
    body: { foo: 'bar' }
  })
})
