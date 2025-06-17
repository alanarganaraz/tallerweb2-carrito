import { API_KEY } from '../config/env.js'

export const apiKeyMiddleware = (req, res, next) => {
  const key = req.headers['x-api-key']
  if (!key || key !== API_KEY) {
    return res.status(401).json({ error: 'Invalid or missing API key' })
  }
  next()
}
