import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './src/routes/auth.routes.js'
import { apiKeyMiddleware } from './src/middlewares/apikey.js'
import { connectDB } from './src/config/db.js'

dotenv.config()
connectDB()

const app = express()
app.use(express.json())
app.use(apiKeyMiddleware)

app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
