import { config } from 'dotenv'
import TelegramAPI from 'node-telegram-bot-api'
import botConfig from './config.js'
import botOn from './logic.js'

const token = config() && process.env.BOT_API
const bot = new TelegramAPI(token, { polling: true })

const start = () => {
  botConfig(bot)
  botOn(bot)
}

start()
