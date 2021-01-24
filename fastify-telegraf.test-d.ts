declare global {
  type URL = import('url').URL;
}

import fastify from 'fastify'
import { Telegraf } from 'telegraf'
import telegramPlugin from './fastify-telegraf'

const bot = new Telegraf('x')

const app = fastify()
app.register(telegramPlugin, { bot, path: '/path' })
