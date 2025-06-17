import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { findUserByEmail, createUser } from '../repositories/user.repository.js'
import { JWT_SECRET } from '../config/env.js'

export const register = async (data) => {
  const { email, password } = data;
  const existing = await findUserByEmail(email)
  if (existing) throw new Error('User already exists')

  const hashed = await bcrypt.hash(password, 10)

  const bodyToRegister = {
    ...data,
    password: hashed
  }
  const user = await createUser(bodyToRegister)
  return { id: user._id, email: user.email }
}

export const login = async ({ email, password }) => {
  const user = await findUserByEmail(email)
  if (!user) throw new Error('Invalid credentials')

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) throw new Error('Invalid credentials')

  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' })
  return { token }
}
