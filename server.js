import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import authRoutes from './src/routes/auth.routes.js'
import productRoutes from './src/routes/product.routes.js'
import cartRoutes from './src/routes/cart.routes.js'
import orderRoutes from './src/routes/order.routes.js'
import userRoutes from './src/routes/user.routes.js'
import { connectDB } from './src/config/db.js'

dotenv.config()
connectDB()

const app = express()

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE, PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key']
}))

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/product', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/user', userRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
