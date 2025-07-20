import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      price : Number
    }
  ],
  total: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['card', 'transfer'], required: true},
  status: { type: String, enum: ['pending', 'paid', 'expired'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
})

export const Order = mongoose.model('Order', OrderSchema)
