'use strict'

const tap = require('tap')
const Fastify = require('fastify')
const { Telegraf } = require('telegraf')
const plugin = require('../')

const test = tap.test

test('should call bot.handleUpdate method', (t) => {
  const fastify = Fastify()
  const bot = new Telegraf('T')

  bot.handleUpdate = (update) => {
    t.deepEqual(update, { foo: 'bar' })
  }

  setTimeout(() => t.done(), 100)

  fastify.register(plugin, { bot, path: '/secret' })

  fastify.inject({
    method: 'POST',
    path: '/secret',
    body: { foo: 'bar' }
  })
})
