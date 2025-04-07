import express from 'express'
import chatRoute from './routes/chat.route.js'

const app = express()
app.use(express.json())
app.use('/chat', chatRoute)

const PORT = 3000
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
