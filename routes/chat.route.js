import express from 'express'
import { chatWithMemory } from '../services/chat.service.js'

const router = express.Router()

router.post('/', async (req, res) => {
  const { userId, message } = req.body
  const response = await chatWithMemory(userId, message)
  res.json({ response })
})

export default router
