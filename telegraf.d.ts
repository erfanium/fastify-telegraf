import { FastifyPlugin } from 'fastify'

export interface Bot {
   handleUpdate: (updateParams: any) => Promise<any>
}

export interface TelegrafPluginOptions {
  bot: Bot,
  path: string
}

declare const telegrafPlugin: FastifyPlugin<TelegrafPluginOptions>

export default telegrafPlugin
