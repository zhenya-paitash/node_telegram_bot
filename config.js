import { START, HELP, GAME } from './commands.js'

export default function (bot) {
  bot.setMyCommands([
    { command: START, description: 'Приветствие' },
    { command: HELP, description: 'Помощь' },
    { command: GAME, description: 'Игра Угадай число' }
  ])
}
