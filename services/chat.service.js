import fetch from 'node-fetch'
import { getMemory, saveMemory } from '../memory/memory.db.js'
import fs from 'fs'

const LMSTUDIO_API = 'http://127.0.0.1:1234/v1/chat/completions'
const LOG_FILE = './chat.log'

function logToFile(content) {
  const timestamp = new Date().toISOString()
  const log = `[${timestamp}] ${content}\n`
  fs.appendFileSync(LOG_FILE, log)
}

export async function chatWithMemory(userId, newMessage) {
  try {
    const history = await getMemory(userId)

    const messages = [
      { role: 'system', content: 'You are a helpful assistant.' },
      ...history,
      { role: 'user', content: newMessage }
    ]

    // Logging prompt input
    logToFile(`USER ${userId}: ${newMessage}`)

    const response = await fetch(LMSTUDIO_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'local-model', messages })
    })

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || '(no reply)'

    // Logging AI reply
    logToFile(`BOT  ${userId}: ${reply}`)

    await saveMemory(userId, newMessage, reply)
    return reply

  } catch (err) {
    logToFile(`ERROR ${userId}: ${err.message}`)
    return 'Maaf, terjadi kesalahan saat menghubungi AI.'
  }
}
