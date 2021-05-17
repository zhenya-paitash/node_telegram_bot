import { START, HELP, GAME } from './commands.js'
import { gameBtn, gameAgainBtn } from './button.js'

const localDB = {}

export default function (bot) {
  const startGame = async chatId => {
    localDB[chatId] = Math.floor(Math.random() * 10)
    await bot.sendMessage(chatId, 'Угадай число от 0 до 9', gameBtn)
  }

  // on MESSAGE
  bot.on('message', async ({ text, chat }) => {
    const chatId = chat.id

    switch (text) {
      case START:
        await bot.sendSticker(
          chatId,
          'https://tlgrm.ru/_/stickers/88e/586/88e586f0-4299-313f-bedb-ef45c7710422/1.webp'
        )
        return await bot.sendMessage(chatId, `Hello @${chat.username}`)
      case HELP:
        return await bot.sendMessage(chatId, 'this is help')
      case GAME:
        return startGame(chatId)
      default:
        return await bot.sendMessage(chatId, 'Check my commands pls')
    }
  })

  // on CALLBACK from game keyboard QUERY
  bot.on('callback_query', async ({ data, message }) => {
    const chatId = message.chat.id

    if (data === '/again') return startGame(chatId)

    if (+data === +localDB[chatId])
      return await bot.sendMessage(
        chatId,
        `Поздравляю! Ты отгадал, это было число ${localDB[chatId]}`,
        gameAgainBtn
      )

    return await bot.sendMessage(
      chatId,
      `К сожалению ты не отгадал. Это было число ${localDB[chatId]}`,
      gameAgainBtn
    )
  })
}
