import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './src/routes/auth.routes.js'
import productRoutes from './src/routes/product.routes.js'
import cartRoutes from './src/routes/cart.routes.js'
import { connectDB } from './src/config/db.js'

dotenv.config()
connectDB()

const app = express()
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/product', productRoutes)
app.use('/api/cart', cartRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
