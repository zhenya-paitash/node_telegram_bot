import { START, HELP, GAME } from './commands.js'

const chats = {}

const gameBtn = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: '1', callback_data: '1' },
        { text: '2', callback_data: '2' },
        { text: '3', callback_data: '3' },
      ],
      [
        { text: '4', callback_data: '4' },
        { text: '5', callback_data: '5' },
        { text: '6', callback_data: '6' },
      ],
      [
        { text: '7', callback_data: '7' },
        { text: '8', callback_data: '8' },
        { text: '9', callback_data: '9' },
      ],
      [{ text: '0', callback_data: '0' }],
    ],
  }),
}

const againBtn = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: 'Play again?', callback_data: '/again' }]],
  }),
}

const startGame = async (bot, chatId) => {
  chats[chatId] = Math.floor(Math.random() * 10)
  await bot.sendMessage(chatId, 'Угадай число от 0 до 9', gameBtn)
}

export default function (bot) {
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
        return startGame(bot, chatId)
      default:
        return await bot.sendMessage(chatId, 'Check my commands pls')
    }
  })

  // on CALLBACK from game keyboard QUERY
  bot.on('callback_query', async ({ data, message }) => {
    const chatId = message.chat.id

    if (data === '/again') return startGame(bot, chatId)

    if (+data === +chats[chatId])
      return await bot.sendMessage(
        chatId,
        `Поздравляю! Ты отгадал, это было число ${chats[chatId]}`,
        againBtn
      )

    return await bot.sendMessage(
      chatId,
      `К сожалению ты не отгадал. Это было число ${chats[chatId]}`,
      againBtn
    )
  })
}
