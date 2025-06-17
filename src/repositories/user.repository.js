import { User } from '../models/user.model.js'

export const findUserByEmail = (email) => User.findOne({ email })
export const createUser = (userData) => User.create(userData)
