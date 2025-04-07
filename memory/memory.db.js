import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

let db
const dbPath = './memory/memory.sqlite'

async function initDB() {
  if (!db) {
    db = await open({ filename: dbPath, driver: sqlite3.Database })
    await db.exec(`
      CREATE TABLE IF NOT EXISTS memory (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT,
        role TEXT,
        content TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)
  }
  return db
}

export async function getMemory(userId, limit = 10) {
  const db = await initDB()
  const rows = await db.all(
    'SELECT role, content FROM memory WHERE userId = ? ORDER BY timestamp DESC LIMIT ?',
    [userId, limit]
  )
  return rows.reverse() // supaya urut dari awal
}

export async function saveMemory(userId, userMessage, aiReply) {
  const db = await initDB()
  await db.run('INSERT INTO memory (userId, role, content) VALUES (?, ?, ?)', [userId, 'user', userMessage])
  await db.run('INSERT INTO memory (userId, role, content) VALUES (?, ?, ?)', [userId, 'assistant', aiReply])
}
