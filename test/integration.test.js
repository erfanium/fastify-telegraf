'use strict'

const tap = require('tap')
const fastify = require('fastify')
const { Telegraf } = require('telegraf')
const plugin = require('../fastify-telegraf')

const test = tap.test

function createBot (...args) {
  const bot = new Telegraf(...args)
  bot.botInfo = { id: 42, is_bot: true, username: 'bot', first_name: 'Bot' }
  return bot
}

test('should call bot.handleUpdate method', (t) => {
  t.plan(2)

  const app = fastify()
  const bot = createBot()

  bot.handleUpdate = (update, response) => {
    t.deepEqual(update, { foo: 'bar' })
    t.assert(response)
  }

  app.register(plugin, { bot, path: '/secret' })

  app.inject({
    method: 'POST',
    path: '/secret',
    body: { foo: 'bar' }
  })
})

test('should handle webhook when using webhookReply', async (t) => {
  t.plan(2)

  const app = fastify()
  const bot = createBot()

  app.register(plugin, { bot, path: '/secret' })

  bot.on('message', async (ctx) => {
    ctx.telegram.webhookReply = true
    await ctx.replyWithChatAction('typing')
  })

  const response = await app.inject({
    method: 'POST',
    path: '/secret',
    body: {
      update_id: 1,
      message: {
        message_id: 2268,
        from: {
          id: 1,
          is_bot: false,
          first_name: 'ERFANIUM',
          username: 'erfnium',
          language_code: 'en'
        },
        chat: {
          id: 1,
          first_name: 'ERFANIUM',
          username: 'erfnium',
          type: 'private'
        },
        date: 1611508506,
        text: 'sf'
      }
    }
  })

  t.equal(response.statusCode, 200)
  t.deepEqual(response.json(), { method: 'sendChatAction', chat_id: 1, action: 'typing' })
})

test('should handle webhook when webhookReply is off', async (t) => {
  t.plan(2)

  const app = fastify()
  const bot = createBot()

  app.register(plugin, { bot, path: '/secret' })

  bot.on('message', async (ctx) => {
    ctx.telegram.webhookReply = false
  })

  const response = await app.inject({
    method: 'POST',
    path: '/secret',
    body: {
      update_id: 1,
      message: {
        message_id: 2268,
        from: {
          id: 1,
          is_bot: false,
          first_name: 'ERFANIUM',
          username: 'erfnium',
          language_code: 'en'
        },
        chat: {
          id: 1,
          first_name: 'ERFANIUM',
          username: 'erfnium',
          type: 'private'
        },
        date: 1611508506,
        text: 'sf'
      }
    }
  })

  t.equal(response.statusCode, 200)
  t.equal(response.payload, '')
})
