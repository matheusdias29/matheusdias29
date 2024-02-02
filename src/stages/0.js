import { storage } from '../storage.js'
import { VenomBot } from '../venom.js'
import { STAGES } from './index.js'

export const initialStage = {
  async exec({ from }) {
    storage[from].stage = STAGES.MENU

    const venombot = await VenomBot.getInstance()

    const message = `
      👋 Olá, como vai?
      Eu sou arthur, o *assistente virtual* da ${venombot.getSessionName}.
      
      -----------------------------------
      DIGITE acessar PARA COMEÇAR
    `
    await venombot.sendText({ to: from, message })
  },
}
