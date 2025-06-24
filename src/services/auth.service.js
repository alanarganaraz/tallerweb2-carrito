import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { findUserByEmail, createUser } from '../repositories/user.repository.js'
import { JWT_SECRET } from '../config/env.js'
import { createCart as createCartRepo } from '../repositories/cart.repository.js'

export const register = async (data, isAdminRequest = false) => {
  const { email, password } = data;
  const existing = await findUserByEmail(email)
  if (existing) throw new Error('User already exists')

  const hashed = await bcrypt.hash(password, 10)
  const newCart = await createCartRepo();

  const bodyToRegister = {
    ...data,
    password: hashed,
    cartId: newCart._id,
    role: isAdminRequest ? 'admin' : 'user'
  }

  const user = await createUser(bodyToRegister)
  return { id: user._id, email: user.email, role: user.role }
}

export const login = async ({ email, password }) => {
  const user = await findUserByEmail(email)
  if (!user) throw new Error('Invalid credentials')

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) throw new Error('Invalid credentials')
    
  const token = jwt.sign({ id: user._id, email: user.email, name: user.name, address:user.address, phone: user.phone, cartId: user.cartId, role: user.role }, JWT_SECRET, { expiresIn: '1h' })
  return { token }
}
