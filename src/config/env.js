import dotenv from 'dotenv'
dotenv.config()

export const JWT_SECRET = process.env.JWT_SECRET
export const API_KEY = process.env.API_KEY
export const MONGO_URI = process.env.MONGO_URI
