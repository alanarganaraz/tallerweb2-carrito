import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
    address: { type: String },
    phone: { type: String },
    createdAt: { type: Date, default: Date.now }
  })

export const User = mongoose.model('User', userSchema)
