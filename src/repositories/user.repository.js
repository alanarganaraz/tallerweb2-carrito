import { User } from '../models/user.model.js'

export const findUserByEmail = (email) => User.findOne({ email })
export const findUserById = (id) => User.findOne({ _id: id })
export const createUser = (userData) => User.create(userData)
