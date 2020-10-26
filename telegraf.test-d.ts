import fastify from 'fastify'
import { Telegraf } from 'telegraf'
import telegramPlugin, { TelegrafPluginOptions } from './telegraf'

const bot = new Telegraf('x')

const app = fastify()
app.register(telegramPlugin, { bot, path: '/path' })