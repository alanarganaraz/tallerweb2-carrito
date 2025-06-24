import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  originalStock: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  imageUrl: String,
  category: {
    type: String,
    enum: [
      'Bebidas',
      'Comidas',
      'Postres',
      'Snacks',
      'Cerveza',
      'Vino',
      'Tragos',
      'Sin alcohol',
      'Promoción',
      'Happy Hour',
      'Vegano',
      'Apto Celíacos',
      'Café y Té',
      'Entradas',
      'Hamburguesas',
      'Pizzas',
      'Pastas',
      'Sushi',
      'Otros'
    ],
    required: true
  },
  createdAt: { type: Date, default: Date.now }
})
export const Product = mongoose.model('Product', ProductSchema)
