import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema({
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, default: 1 }
    }
  ],
  createdAt: { type: Date, default: Date.now }
})

export const Cart = mongoose.model('Cart', CartSchema)
